import React, { useState } from "react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Card, Collapse, Typography, Input, } from "@material-tailwind/react";
import InputError from "@/Components/InputError";
import axios from "axios";
import { isUserAllowed } from "@/Utils/Utils";


const BannerAdminPage = ({ auth, banners }) => {
    const { role, permissions } = usePage().props.auth

    const { data, setData, post, processing, errors, reset, delete: destroy, } = useForm({
        title: "",
        banners: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [toggleOpen, setToggleOpen] = useState(false);
    const [draggingItem, setDraggingItem] = useState(null);

    const toggleCollapse = () => {
        setToggleOpen(!toggleOpen);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            if (data.banners[0]?.size / (1024 * 1024) > 2) {
                setData('banners', []);
                setImageUploadError(
                    "Image Size should equal or less than 2 mb"
                );
            } else {
                setImageUploadError('');
                formData.append("banners", data.banners[0]);
                formData.append("title", data.title);

                post(route("admin.banner.store", formData), {
                    onSuccess: () => {
                        setToggleOpen(false);
                        reset();
                    },
                    onError: (error) => {
                        console.log(error);
                    },
                });
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };


    const onDeleteHandler = (id) => {
        destroy(route("admin.banner.delete", id));
    };

    // Drag and drop

    const handleDragStart = (e, item) => {
        setDraggingItem(item);
    };

    const handleDragEnd = () => {
        setDraggingItem(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetItem) => {
        if (!draggingItem) return;
        const items = banners;
        const currentIndex = items.indexOf(draggingItem);
        const targetIndex = items.indexOf(targetItem);
        if (currentIndex !== -1 && targetIndex !== -1) {
            items.splice(currentIndex, 1);
            items.splice(targetIndex, 0, draggingItem);
            axios.post(route('admin.banner.reorder', draggingItem?.id), { position: targetIndex + 1 })
            axios.post(route('admin.banner.reorder', targetItem?.id), { position: currentIndex + 1 })

        }
    };

    return (
        <Authenticated user={auth?.user}>
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
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
                    <div className="right">
                        <button className="bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins" onClick={toggleCollapse}>
                            Add New
                        </button>
                    </div>
                </div>
                <div>
                    <Collapse open={toggleOpen}>
                        <Card className="px-6">
                            <form onSubmit={formSubmit}>
                                <div className="mb-6">
                                    <Typography variant="h6" color="blue-gray" className="my-3">Title</Typography>
                                    <Input
                                        size="lg"
                                        placeholder="enter banner title"
                                        value={data.title}
                                        onChange={(e) => setData("title", e.target.value)}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{ className: "before:content-none after:content-none", }}
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                    <Typography variant="h6" color="blue-gray" className="my-3">Update Banner</Typography>
                                    <Input
                                        type="file"
                                        size="lg"
                                        onChange={(e) => {
                                            setImageUploadError('')
                                            setData("banners", [
                                                ...(data.banners || []),
                                                ...[...e.target.files].map(
                                                    (file) =>
                                                        Object.assign(file, {
                                                            preview:
                                                                URL.createObjectURL(
                                                                    file
                                                                ),
                                                        })
                                                ),
                                            ]);
                                        }}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                    <InputError message={imageUploadError ? imageUploadError : errors.banners} className="mt-2" />
                                </div>
                                <div className="font-item mb-4 text-right">
                                    <button className="bg-blue-500 text-white px-6 py-3 font-poppins rounded-sm font-bold" disabled={processing}>Upload</button>
                                </div>
                            </form>
                        </Card>
                    </Collapse>
                </div>

                <div className="mt-6 flex flex-wrap gap-6 mx-6">
                    {banners.map((itm, index) => {
                        return (
                            <Card
                                className="mt-6 w-[450px] cursor-pointer"
                                key={itm?.id}
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, itm)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, itm)}
                            >
                                <div className="flex gap-6">
                                    <img src={`${itm?.bannerpath}`} alt={`${itm?.title}`} className="h-[100px] w-[100px] object-cover rounded-md" />
                                    <div className="flex justify-between items-center w-full pr-4">
                                        <Typography variant="h5" color="blue-gray">{itm?.title}</Typography>
                                        {isUserAllowed(permissions, ["delete_banners"], role) && (
                                            <button
                                                className="bg-red-500  text-white py-1 px-3 text-xs font-poppins rounded-sm font-bold"
                                                disabled={processing}
                                                onClick={() => onDeleteHandler(itm?.id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </Authenticated>
    );
};

export default BannerAdminPage;
