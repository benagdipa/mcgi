import React, { useState, useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm, usePage, router } from "@inertiajs/react";
import { 
  Card, 
  Collapse, 
  Typography, 
  Input,
  Button,
  Spinner,
  Alert,
  Tooltip,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import InputError from "@/Components/InputError";
import axios from "axios";
import { isUserAllowed } from "@/Utils/Utils";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Banner Card Component
const SortableBannerCard = ({ banner, onDelete, permissions, role, processing }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: banner.id });
  
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteProcessing, setDeleteProcessing] = useState(false);
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    setDeleteProcessing(true);
    onDelete(banner.id, () => {
      setConfirmDelete(false);
      setDeleteProcessing(false);
    }, () => {
      setDeleteProcessing(false);
    });
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className="mt-4 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] transition-all hover:shadow-lg"
        {...attributes}
      >
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          <div 
            className="cursor-grab active:cursor-grabbing flex items-center justify-center"
            {...listeners}
            aria-label="Drag to reorder banner"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path>
            </svg>
          </div>
          <div className="flex-shrink-0 relative group">
            <img 
              src={`${banner.bannerpath}`} 
              alt={`${banner.title}`} 
              className="h-[120px] w-[200px] object-cover rounded-lg shadow-sm" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg"></div>
          </div>
          <div className="flex flex-col justify-between w-full">
            <div>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {banner.title}
              </Typography>
              <Typography variant="small" color="gray" className="mb-4">
                Position: {banner.position || "Not set"}
              </Typography>
            </div>
            {isUserAllowed(permissions, ["delete_banners"], role) && (
              <div className="self-end">
                <Button 
                  color="red" 
                  size="sm" 
                  variant="text"
                  onClick={() => setConfirmDelete(true)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      <Dialog open={confirmDelete} handler={() => !deleteProcessing && setConfirmDelete(!confirmDelete)} size="xs">
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>
          Are you sure you want to delete the banner "{banner.title}"? This action cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button 
            variant="text" 
            color="gray" 
            onClick={() => setConfirmDelete(false)}
            disabled={deleteProcessing}
          >
            Cancel
          </Button>
          <Button 
            color="red" 
            onClick={handleDelete}
            disabled={deleteProcessing}
          >
            {deleteProcessing ? <Spinner className="h-4 w-4 mr-2" /> : null}
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

const BannerAdminPage = ({ auth, banners: initialBanners }) => {
    const { role, permissions } = usePage().props.auth;
    const [banners, setBanners] = useState(initialBanners || []);
    const [notification, setNotification] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        title: "",
        banners: [],
    });
    
    const [imageUploadError, setImageUploadError] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [reorderProcessing, setReorderProcessing] = useState(false);
    
    // Update banners state when initialBanners change
    useEffect(() => {
      if (initialBanners) {
        setBanners(initialBanners);
      }
    }, [initialBanners]);
    
    // Configure DnD sensors
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
    
    const showNotification = (type, message) => {
      setNotification({ type, message });
      setTimeout(() => setNotification(null), 5000);
    };

    // Refresh banners data from server
    const refreshBanners = () => {
      setIsRefreshing(true);
      router.reload({ 
        only: ['banners'],
        onSuccess: () => {
          setIsRefreshing(false);
        },
        onError: () => {
          setIsRefreshing(false);
          showNotification('error', 'Failed to refresh banner data');
        }
      });
    };
    
    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            if (!data.title.trim()) {
              setData('title', '');
              return;
            }

            if (!data.banners[0]) {
              setImageUploadError('Please select an image for the banner');
              return;
            }

            if (data.banners[0]?.size / (1024 * 1024) > 2) {
                setData('banners', []);
                setImageUploadError(
                    "Image size should be equal to or less than 2MB"
                );
                return;
            } 
            
            setImageUploadError('');
            formData.append("banners", data.banners[0]);
            formData.append("title", data.title);

            // Create temporary banner for optimistic UI update
            const tempBanner = {
              id: 'temp-' + Date.now(),
              title: data.title,
              bannerpath: previewImage,
              position: banners.length + 1,
              isTemp: true
            };

            // Optimistically add the banner to the UI
            setBanners([...banners, tempBanner]);
            
            // Close modal and reset form immediately for better UX
            setIsModalOpen(false);

            post(route("admin.banner.store", formData), {
                onSuccess: (response) => {
                    reset();
                    setPreviewImage(null);
                    showNotification('success', 'Banner added successfully!');
                    
                    // Remove temp banner and refresh to get real data
                    setBanners(banners => banners.filter(b => !b.isTemp));
                    refreshBanners();
                },
                onError: (errors) => {
                    // Remove temporary banner on error
                    setBanners(banners => banners.filter(b => !b.isTemp));
                    
                    // Reopen modal to show error
                    setIsModalOpen(true);
                    
                    // Show specific error messages
                    if (errors.title) {
                      showNotification('error', `Title error: ${errors.title}`);
                    } else if (errors.banners) {
                      setImageUploadError(errors.banners);
                    } else {
                      showNotification('error', 'Failed to add banner. Please try again.');
                    }
                },
            });
        } catch (error) {
            console.error("Error uploading images:", error);
            showNotification('error', 'An unexpected error occurred.');
            // Remove temp banner on unexpected error
            setBanners(banners => banners.filter(b => !b.isTemp));
        }
    };

    const onDeleteHandler = (id, onSuccess, onError) => {
        // Optimistic UI update - remove banner immediately
        const removedBanner = banners.find(banner => banner.id === id);
        const bannerIndex = banners.findIndex(banner => banner.id === id);
        setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
        
        destroy(route("admin.banner.delete", id), {
          onSuccess: () => {
            showNotification('success', 'Banner deleted successfully!');
            if (onSuccess) onSuccess();
            
            // Refresh to make sure our state is in sync with server
            refreshBanners();
          },
          onError: (error) => {
            // Restore the banner if deletion fails
            if (removedBanner && bannerIndex !== -1) {
              setBanners(prevBanners => {
                const newBanners = [...prevBanners];
                newBanners.splice(bannerIndex, 0, removedBanner);
                return newBanners;
              });
            }
            
            if (onError) onError();
            showNotification('error', error?.message || 'Failed to delete banner. Please try again.');
          }
        });
    };

    const handleDragEnd = (event) => {
      const { active, over } = event;
      
      if (active.id !== over.id) {
        // Optimistic UI update
        setBanners((items) => {
          const oldIndex = items.findIndex(item => item.id === active.id);
          const newIndex = items.findIndex(item => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
        
        // Update positions in database with a single call
        setReorderProcessing(true);
        
        const updatedPositions = banners.map((banner, index) => ({
          id: banner.id,
          position: index + 1
        }));
        
        axios.post(route('admin.banner.reorder-all'), { positions: updatedPositions })
          .then(() => {
            setReorderProcessing(false);
            showNotification('success', 'Banner order updated successfully');
            // Refresh to get latest data
            refreshBanners();
          })
          .catch(err => {
            setReorderProcessing(false);
            console.error("Error updating positions:", err);
            showNotification('error', 'Failed to update banner positions');
            // Refresh to restore correct order from server
            refreshBanners();
          });
      }
    };
    
    const handleFileChange = (e) => {
      setImageUploadError('');
      const file = e.target.files[0];
      
      if (file) {
        // Validate file type and size
        const fileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
        
        if (!fileTypes.includes(file.type)) {
          setImageUploadError('Please upload a valid image file (JPEG, PNG, GIF, WebP)');
          return;
        }
        
        if (file.size > 2 * 1024 * 1024) {
          setImageUploadError('Image size should be equal to or less than 2MB');
          return;
        }
        
        setData("banners", [file]);
        setPreviewImage(URL.createObjectURL(file));
      }
    };

    // Clean up URL objects when component unmounts
    useEffect(() => {
      return () => {
        if (previewImage) URL.revokeObjectURL(previewImage);
      };
    }, [previewImage]);

    return (
        <Authenticated user={auth?.user}>
            <div className="content py-4 font-poppins">
                {notification && (
                  <div className="fixed top-20 right-4 z-50 w-80">
                    <Alert
                      color={notification.type === 'success' ? 'green' : 'red'}
                      dismissible={{
                        onClose: () => setNotification(null),
                      }}
                    >
                      {notification.message}
                    </Alert>
                  </div>
                )}
                
                <div className="content-header px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="left">
                        <h1 className="font-semibold text-gray-800 text-3xl">
                            Banners
                        </h1>
                        <div className="pt-2">
                            <ul className="flex gap-1 text-gray-600 text-sm">
                                <li><Link href={route("dashboard")}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route("admin.album.index")}>Banner</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right flex items-center gap-3">
                        <Button 
                          color="blue-gray" 
                          size="sm" 
                          variant="outlined"
                          className="flex items-center gap-2"
                          onClick={refreshBanners}
                          disabled={isRefreshing}
                        >
                          {isRefreshing ? (
                            <Spinner className="h-4 w-4" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                          )}
                          Refresh
                        </Button>
                        <Button 
                          color="amber" 
                          size="lg" 
                          className="normal-case font-semibold shadow-lg"
                          onClick={() => setIsModalOpen(true)}
                        >
                          Add New Banner
                        </Button>
                    </div>
                </div>
                
                {/* Add Banner Dialog */}
                <Dialog
                  open={isModalOpen}
                  handler={() => !processing && setIsModalOpen(!isModalOpen)}
                  size="md"
                >
                  <div className="flex items-center justify-between p-4">
                    <DialogHeader className="text-2xl font-semibold">Add New Banner</DialogHeader>
                    <IconButton
                      color="gray"
                      size="sm"
                      variant="text"
                      onClick={() => !processing && setIsModalOpen(false)}
                      className="rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </IconButton>
                  </div>
                  
                  <DialogBody divider>
                    <form id="addBannerForm" onSubmit={formSubmit}>
                      <div className="mb-6">
                        <Typography variant="h6" color="blue-gray" className="mb-3">Title</Typography>
                        <Input
                          size="lg"
                          placeholder="Enter banner title"
                          value={data.title}
                          onChange={(e) => setData("title", e.target.value)}
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{ className: "before:content-none after:content-none" }}
                          required
                        />
                        <InputError message={errors.title} className="mt-2" />
                        
                        <Typography variant="h6" color="blue-gray" className="mt-6 mb-3">Upload Banner Image</Typography>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="file"
                            id="banner-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <label htmlFor="banner-upload" className="cursor-pointer block w-full">
                            {previewImage ? (
                              <div className="flex flex-col items-center">
                                <img 
                                  src={previewImage} 
                                  alt="Banner preview" 
                                  className="max-h-40 max-w-full object-contain rounded mb-2" 
                                />
                                <span className="text-blue-500 hover:underline">Change image</span>
                              </div>
                            ) : (
                              <div className="py-4">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="mt-1 text-sm text-gray-600">
                                  Click to upload a banner image<br />
                                  <span className="text-xs text-gray-500">PNG, JPG, GIF, WEBP up to 2MB</span>
                                </p>
                              </div>
                            )}
                          </label>
                        </div>
                        <InputError message={imageUploadError ? imageUploadError : errors.banners} className="mt-2" />
                      </div>
                    </form>
                  </DialogBody>
                  
                  <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="gray" onClick={() => setIsModalOpen(false)} disabled={processing}>
                      Cancel
                    </Button>
                    <Button color="blue" type="submit" form="addBannerForm" disabled={processing}>
                      {processing ? <Spinner className="h-4 w-4 mr-2" /> : null}
                      Upload Banner
                    </Button>
                  </DialogFooter>
                </Dialog>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Typography color="gray">
                      Drag and drop banners to change their display order
                    </Typography>
                    {reorderProcessing && <Spinner className="h-4 w-4" />}
                  </div>
                  <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={banners.map(b => b.id)}>
                      <div className="flex flex-wrap gap-4">
                        {isRefreshing ? (
                          <div className="w-full flex justify-center py-16">
                            <Spinner className="h-8 w-8" />
                          </div>
                        ) : banners.length > 0 ? (
                          banners.map((banner) => (
                            <SortableBannerCard
                              key={banner.id}
                              banner={banner}
                              onDelete={onDeleteHandler}
                              permissions={permissions}
                              role={role}
                              processing={processing}
                            />
                          ))
                        ) : (
                          <div className="w-full py-16 text-center">
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                              No banners found
                            </Typography>
                            <Typography color="gray">
                              Click the "Add New Banner" button to get started
                            </Typography>
                          </div>
                        )}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
            </div>
        </Authenticated>
    );
};

export default BannerAdminPage;
