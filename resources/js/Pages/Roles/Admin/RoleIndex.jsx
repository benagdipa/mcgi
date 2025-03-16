import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { isUserAllowed } from '@/Utils/Utils';
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { Card, Typography, Button, Spinner, Tooltip } from '@material-tailwind/react';
import { RiCloseLargeFill, RiEdit2Line, RiDeleteBin6Line, RiEyeLine, RiShieldCheckLine } from "react-icons/ri";
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default function RoleIndex({ auth, roles }) {

    const { role, permissions } = usePage().props.auth

    const TABLE_HEAD = ["SN", "Role Name", "Permissions", "Actions"];
    const [addEditModal, setAddEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState('');
    const [selectedItem, setSelectedItem] = useState('')
    const [expandedPermissions, setExpandedPermissions] = useState({});

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        name: '',
        permissions: []
    });

    const permissionsItems = [
        { name: "Blog Posts", items: ['create', 'edit', 'delete'] },
        { name: "Categories", items: ['create', 'edit', 'delete'] },
        { name: "Tags", items: ['create', 'edit', 'delete'] },
        { name: "Events", items: ['create', 'edit', 'delete'] },
        { name: "Users", items: ['create', 'edit', 'delete'] },
        { name: "Locale", items: ['create', 'edit', 'delete'] },
        { name: "Church Locations", items: ['create', 'edit', 'delete'] },
        { name: "Albums", items: ['create', 'edit', 'delete'] },
        { name: "Email Templates", items: ['create', 'edit', 'delete'] },
        { name: "Roles", items: ['create', 'edit', 'delete'] },
        { name: "Banners", items: ['create', 'edit', 'delete'] },
        { name: "Event Forms", items: ['create', 'edit', 'delete'] },
    ]

    const toggleExpandPermissions = (roleId) => {
        setExpandedPermissions(prev => ({
            ...prev,
            [roleId]: !prev[roleId]
        }));
    }

    const openAddEditModal = (type, id = 0) => {
        if (id !== 0) { setSelectedItem(id) }
        if (type === 'add') {
            setModalTitle('Add New')
            setFormType('_add')
            reset();
        } else if (type === 'view') {
            const selected = roles.filter(obj => obj.id === id)
            setData({ ...selected[0] });
            setModalTitle('View')
            setFormType('_view')
        }
        else if (type === 'edit') {
            const selected = roles.filter(obj => obj.id === id)
            setData({ ...selected[0] });
            setModalTitle('Edit')
            setFormType('_edit')
        }
        setAddEditModal(true)
    }

    const closeAddEditModal = () => {
        setAddEditModal(false)
        reset();
    }

    const handlePermissionCheckBoxChange = (e) => {
        const { checked, value } = e.target
        if (checked) {
            const prevItems = data.permissions;
            setData('permissions', [...prevItems, value]);
        } else {
            const filteredItems = data.permissions.filter((item) => item !== value);
            setData('permissions', filteredItems);
        }
    }

    // Handle checking/unchecking all permissions for a category
    const handleCategoryPermissionChange = (categoryName, isChecked) => {
        const categoryPermissions = permissionsItems
            .find(p => p.name === categoryName)
            .items.map(item => `${item}_${categoryName.toLowerCase().replace(/ /g, "_")}`);
            
        if (isChecked) {
            // Add all permissions for this category
            const newPermissions = [...data.permissions];
            categoryPermissions.forEach(perm => {
                if (!newPermissions.includes(perm)) {
                    newPermissions.push(perm);
                }
            });
            setData('permissions', newPermissions);
        } else {
            // Remove all permissions for this category
            const filteredPermissions = data.permissions.filter(perm => !categoryPermissions.includes(perm));
            setData('permissions', filteredPermissions);
        }
    }

    const isCategoryFullyChecked = (categoryName) => {
        const categoryPermissions = permissionsItems
            .find(p => p.name === categoryName)
            .items.map(item => `${item}_${categoryName.toLowerCase().replace(/ /g, "_")}`);
            
        return categoryPermissions.every(perm => data.permissions.includes(perm));
    }

    const isCategoryPartiallyChecked = (categoryName) => {
        const categoryPermissions = permissionsItems
            .find(p => p.name === categoryName)
            .items.map(item => `${item}_${categoryName.toLowerCase().replace(/ /g, "_")}`);
            
        const checkedCount = categoryPermissions.filter(perm => data.permissions.includes(perm)).length;
        return checkedCount > 0 && checkedCount < categoryPermissions.length;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === '_add') {
            post(route('admin.roles.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setAddEditModal(false);
                    toast.success('Role created successfully!');
                },
                onError: () => {
                    toast.error('Failed to create role. Please check the form for errors.');
                }
            });
        } else if (formType === '_edit') {
            post(route('admin.roles.update', selectedItem), {
                onSuccess: () => {
                    reset();
                    setAddEditModal(false);
                    toast.success('Role updated successfully!');
                },
                onError: () => {
                    toast.error('Failed to update role. Please check the form for errors.');
                }
            })
        }
    }
    
    const openDeleteModal = (id) => {
        setSelectedItem(id)
        setDeleteModal(true)
    }
    
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }
    
    const handleDeleteFunc = () => {
        if (selectedItem) {
            destroy(route('admin.roles.delete', selectedItem), {
                onSuccess: () => {
                    closeDeleteModal();
                    toast.success('Role deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete role.');
                }
            })
        }
    }

    const formatPermissionsList = (permissionsList) => {
        if (!permissionsList || permissionsList.length === 0) return "No permissions assigned";
        
        // Group by module
        const grouped = {};
        permissionsList.forEach(perm => {
            // Extract module name from permission format "action_module_name"
            const parts = perm.split('_');
            const action = parts[0];
            const moduleParts = parts.slice(1);
            const module = moduleParts.join('_');
            
            if (!grouped[module]) {
                grouped[module] = [];
            }
            grouped[module].push(action);
        });
        
        // Format for display
        return Object.entries(grouped).map(([module, actions]) => {
            const formattedModule = module.replace(/_/g, ' ');
            return `${formattedModule} (${actions.join(', ')})`;
        }).join('; ');
    }
    
    return (
        <Authenticated user={auth?.user}>
            <Head title="Roles & Permissions" />
            <Toaster position="top-right" />
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>Role Management</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.roles.index')}>Roles</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <Button 
                            className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins normal-case flex items-center gap-2'
                            onClick={() => { openAddEditModal('add') }}
                        >
                            <span>Add New Role</span>
                        </Button>
                    </div>
                </div>
                <div className="page-content pt-6">
                    <div className="bg-white rounded-lg shadow-md mx-6 p-4">
                        <Card className="h-full w-full overflow-hidden rounded-lg border border-gray-200 font-poppins shadow-none">
                            <table className="w-full min-w-max table-auto text-left font-poppins">
                                <thead>
                                    <tr className="bg-gray-50">
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 p-4">
                                                <Typography className="font-semibold text-sm leading-none opacity-70 font-poppins">{head}</Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map(({ id, name, permissions: rolePermissions }, index) => {
                                        const isLast = index === roles.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                        const isExpanded = expandedPermissions[id] || false;
                                        
                                        return (
                                            <tr key={id} className="hover:bg-gray-50">
                                                <td className={classes}><Typography className="font-medium font-poppins text-sm">{`${index + 1}`}</Typography></td>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-2">
                                                        <RiShieldCheckLine className="text-yellow-600" />
                                                        <Typography className="font-medium font-poppins text-sm">{`${name}`}</Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="max-w-md">
                                                        {rolePermissions && rolePermissions.length > 0 ? (
                                                            <>
                                                                <Typography className="font-medium font-poppins text-sm line-clamp-1">
                                                                    {isExpanded 
                                                                        ? formatPermissionsList(rolePermissions)
                                                                        : `${rolePermissions.length} permissions assigned`}
                                                                </Typography>
                                                                <Button 
                                                                    variant="text" 
                                                                    size="sm"
                                                                    className="p-0 mt-1"
                                                                    onClick={() => toggleExpandPermissions(id)}
                                                                >
                                                                    {isExpanded ? "Collapse" : "Show details"}
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <Typography className="font-medium font-poppins text-sm text-gray-500">
                                                                No permissions assigned
                                                            </Typography>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex gap-2">
                                                        <Tooltip content="View Role Details">
                                                            <Button 
                                                                size="sm" 
                                                                variant="text" 
                                                                className="flex items-center gap-1 text-blue-500 p-1"
                                                                onClick={() => { openAddEditModal('view', id) }}
                                                            >
                                                                <RiEyeLine /> View
                                                            </Button>
                                                        </Tooltip>
                                                        
                                                        <Tooltip content="Edit Role">
                                                            <Button 
                                                                size="sm" 
                                                                variant="text" 
                                                                className="flex items-center gap-1 text-blue-500 p-1"
                                                                onClick={() => { openAddEditModal('edit', id) }}
                                                            >
                                                                <RiEdit2Line /> Edit
                                                            </Button>
                                                        </Tooltip>
                                                        
                                                        {isUserAllowed(permissions, ['delete_roles'], role) && (
                                                            <Tooltip content="Delete Role">
                                                                <Button 
                                                                    size="sm" 
                                                                    variant="text" 
                                                                    className="flex items-center gap-1 text-red-500 p-1"
                                                                    onClick={() => { openDeleteModal(id) }}
                                                                >
                                                                    <RiDeleteBin6Line /> Delete
                                                                </Button>
                                                            </Tooltip>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {roles.length === 0 && (
                                <div className="text-center py-6">
                                    <Typography className="font-medium font-poppins">No roles found</Typography>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
            {/* Add/Edit Modal */}
            <Modal show={addEditModal} onClose={closeAddEditModal} maxWidth={'3xl'}>
                <div className="delete-modal px-6 py-8 relative font-poppins">
                    <h1 className='font-bold text-2xl font-poppins'>{modalTitle} Role</h1>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <RiCloseLargeFill strokeWidth={1.5} size={38} onClick={closeAddEditModal} />
                    </div>
                    <div className="modal-content pt-6">
                        <form onSubmit={handleSubmit}>
                            <div className="form-item mb-8">
                                <InputLabel value="Role Name" className='mb-1 font-poppins font-semibold' />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="w-full rounded-md font-poppins"
                                    placeholder="Role Name..."
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={formType === '_view'}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            
                            <div className="form-item mb-8">
                                <div className="border-b pb-2 mb-4">
                                    <InputLabel value="Permissions" className='text-lg font-poppins font-semibold' />
                                    <p className="text-sm text-gray-600 mt-1">
                                        Assign permissions to this role to control access to different features
                                    </p>
                                </div>
                                
                                <div className="permission-wrapper space-y-6">
                                    {permissionsItems.map(({ name, items }, index) => (
                                        <div key={index} className="permission-category bg-gray-50 p-4 rounded-md">
                                            <div className="flex items-center mb-3">
                                                <Checkbox
                                                    className='w-5 h-5 mr-2 focus:ring-yellow-500 text-yellow-500'
                                                    id={`category-${name}`}
                                                    checked={isCategoryFullyChecked(name)}
                                                    indeterminate={isCategoryPartiallyChecked(name)}
                                                    onChange={(e) => handleCategoryPermissionChange(name, e.target.checked)}
                                                    disabled={formType === '_view'}
                                                />
                                                <InputLabel 
                                                    htmlFor={`category-${name}`}
                                                    value={name} 
                                                    className='text-lg font-poppins font-medium cursor-pointer'
                                                />
                                            </div>
                                            
                                            <div className="grid grid-cols-3 gap-3 ml-7">
                                                {items.map((item, perIndex) => {
                                                    const permissionName = `${item}_${name.toLowerCase().replace(/ /g, "_")}`
                                                    return (
                                                        <div className='flex items-center' key={perIndex}>
                                                            <Checkbox
                                                                id={`permission-${permissionName}`}
                                                                className='w-4 h-4 mr-2 focus:ring-yellow-500 text-yellow-500'
                                                                value={permissionName}
                                                                onChange={(e) => handlePermissionCheckBoxChange(e)}
                                                                checked={data.permissions.includes(permissionName)}
                                                                disabled={formType === '_view'}
                                                            />
                                                            <InputLabel 
                                                                htmlFor={`permission-${permissionName}`}
                                                                value={item.charAt(0).toUpperCase() + item.slice(1)} 
                                                                className='text-sm font-poppins cursor-pointer'
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {formType !== '_view' && (
                                <div className="flex justify-end gap-3 mt-8">
                                    <Button
                                        variant="outlined"
                                        color="red"
                                        onClick={closeAddEditModal}
                                        className="normal-case"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-[#f5cd06] text-[#0f0f0f] normal-case"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <div className="flex items-center gap-2">
                                                <Spinner className="h-4 w-4" /> Processing...
                                            </div>
                                        ) : (
                                            'Save Role'
                                        )}
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal show={deleteModal} onClose={closeDeleteModal} maxWidth={'xl'}>
                <div className="delete-modal px-6 py-8 relative font-poppins">
                    <h1 className='font-bold text-2xl text-center'>Confirm Role Deletion</h1>
                    <p className="text-center text-gray-600 mt-4">
                        Are you sure you want to delete this role? Users with this role will be assigned to the 'guest' role.
                    </p>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <RiCloseLargeFill strokeWidth={1.5} size={38} onClick={closeDeleteModal} />
                    </div>
                    <div className="flex justify-center gap-4 pt-6">
                        <Button
                            variant="outlined"
                            color="gray"
                            onClick={closeDeleteModal}
                            className="normal-case"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            color="red"
                            onClick={handleDeleteFunc}
                            className="normal-case"
                        >
                            Delete Role
                        </Button>
                    </div>
                </div>
            </Modal>
        </Authenticated>
    )
}
