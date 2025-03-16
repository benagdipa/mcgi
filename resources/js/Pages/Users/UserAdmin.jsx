import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { Card, Typography, Button, Spinner } from "@material-tailwind/react";
import Modal from '@/Components/Modal';

import { RiCloseLargeFill, RiEdit2Line, RiDeleteBin6Line, RiCheckLine, RiFilterLine, RiSortAsc, RiSortDesc } from "react-icons/ri";
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { isUserAllowed } from '@/Utils/Utils';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function UserAdmin({ auth, users_list, locale, roles }) {
  
    const { role, permissions } = usePage().props.auth

    const TABLE_HEAD = ["SN", "First Name", "Last Name", 'Email', "Phone", "Locale", "Role", "Actions", "Status"];
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        local: '',
        role: ''
    });

    const [addEditModal, setAddEditModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('');
    const [formType, setFormType] = useState('');
    const [selectedItem, setSelectedItem] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [processingApproval, setProcessingApproval] = useState(false)

    const [searchText, setSearchText] = useState('')
    const [filterLocale, setFilterLocale] = useState('')
    const [filterRole, setFilterRole] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [sortField, setSortField] = useState('first_name')
    const [sortDirection, setSortDirection] = useState('asc')
    const [isLoading, setIsLoading] = useState(false)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(10)

    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    useEffect(() => {
        setUsers(users_list)
        setFilteredUsers(users_list)
    }, [])

    // Sort users
    const sortUsers = (users, field, direction) => {
        return [...users].sort((a, b) => {
            if (field === 'local') {
                const localeA = getLocale(a.local) || '';
                const localeB = getLocale(b.local) || '';
                return direction === 'asc' 
                    ? localeA.localeCompare(localeB) 
                    : localeB.localeCompare(localeA);
            }
            
            if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const handleSort = (field) => {
        const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(direction);
        setFilteredUsers(sortUsers(filteredUsers, field, direction));
    }

    const getLocale = (id) => {
        if (id) {
            const selectedLocale = locale.filter(obj => obj.id === parseInt(id))
            if (selectedLocale.length) {
                return selectedLocale[0].title
            }
        }
        return '';
    }

    const getRoleName = (userRoles) => {
        if (userRoles && userRoles.length > 0) {
            return userRoles[0].name;
        }
        return 'guest';
    }

    const openAddEditModal = (type, id = 0) => {
        if (id !== 0) { setSelectedItem(id) }
        if (type === 'add') {
            setModalTitle('Add New')
            setFormType('_add')
            reset();
        } else if (type === 'edit') {
            const selected = users.filter(obj => obj.id === id)
            setData({ 
                ...selected[0], 
                'role': selected[0].roles && selected[0].roles[0] ? selected[0].roles[0].name : 'guest',
                'password': '',
                'password_confirmation': ''
            });
            setModalTitle('Edit')
            setFormType('_edit')
        }
        setAddEditModal(true)
    }
    

    const closeAddEditModal = () => {
        setAddEditModal(false)
        reset();
    }
    
    const addEditSubmit = (e) => {
        e.preventDefault();
        if (formType === '_add') {
            post(route('admin.users.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                    toast.success('User created successfully!');
                },
                onError: () => {
                    toast.error('Failed to create user. Please check the form for errors.');
                }
            });
        } else if (formType === '_edit') {
            post(route('admin.users.update', selectedItem), {
                onSuccess: () => {
                    reset();
                    setAddEditModal(false)
                    toast.success('User updated successfully!');
                },
                onError: () => {
                    toast.error('Failed to update user. Please check the form for errors.');
                }
            })
        }
    }

    const openDeleteModal = (user_id) => {
        setSelectedItem(user_id)
        setDeleteModal(true)
    }
    
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }
    
    const handleDeleteFunc = () => {
        if (selectedItem) {
            router.delete(route('admin.users.delete', selectedItem), {
                onSuccess: () => {
                    closeDeleteModal()
                    toast.success('User deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete user.');
                }
            })
        }
    }
    
    const handleSearch = async () => {
        setIsLoading(true);
        try {
            if (searchText.length >= 3 || filterLocale || filterRole) {
                const res = await axios.post(route('admin.search.user'),
                    {
                        search_query: searchText,
                        search_locale: filterLocale,
                        search_role: filterRole
                    }
                )
                if (res?.data) {
                    setFilteredUsers(sortUsers(res.data, sortField, sortDirection));
                }
            } else {
                setFilteredUsers(sortUsers(users, sortField, sortDirection));
            }
        } catch (error) {
            toast.error('Error searching users');
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch()
        }, 500)
        
        return () => clearTimeout(timeoutId);
    }, [searchText, filterLocale, filterRole])

    const onHandleAdminAproval = async (id) => { 
        setProcessingApproval(true);
        try {
            if (id) {
                const res = await axios.post(route('admin.users.approval'), {id})
                if(res.status === 200) {
                    setFilteredUsers(res?.data?.users)
                    toast.success(res?.data?.message || 'User approved successfully!');
                } else {
                    toast.error('Failed to approve user.');
                }
            }
        } catch (error) {
            toast.error('Error approving user');
        } finally {
            setProcessingApproval(false);
        }
    }   

    const clearFilters = () => {
        setSearchText('');
        setFilterLocale('');
        setFilterRole('');
    }

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Authenticated user={auth?.user}>
            <Head title='Users' />
            <Toaster position="top-right" />
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className='font-semibold text-gray-800 text-3xl'>User Management</h1>
                        <div className="pt-2">
                            <ul className='flex gap-1 text-gray-600 text-sm'>
                                <li><Link href={route('dashboard')}>Dashboard</Link></li>
                                <li>/</li>
                                <li><Link href={route('admin.users.index')}>Users</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <Button 
                            className='bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins normal-case flex items-center gap-2'
                            onClick={() => { openAddEditModal('add') }}
                        >
                            <span>Add New User</span>
                        </Button>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md mx-6 mt-6 p-4">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="flex-1">
                            <TextInput
                                type="text"
                                placeholder='Search by name, email, phone...'
                                className='rounded border-gray-400/80 w-full focus:ring-yellow-500 focus:border-yellow-500'
                                value={searchText}
                                onChange={(e) => { setSearchText(e.target.value) }}
                            />
                        </div>
                        
                        <Button 
                            variant="outlined"
                            className="flex items-center gap-2 border-gray-300 text-gray-700"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <RiFilterLine /> Filters
                        </Button>
                        
                        {(searchText || filterLocale || filterRole) && (
                            <Button 
                                variant="text"
                                className="text-red-500" 
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                    
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-md">
                            <div>
                                <InputLabel value="Filter by Locale" className="mb-1" />
                                <select
                                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm w-full"
                                    value={filterLocale}
                                    onChange={(e) => setFilterLocale(e.target.value)}
                                >
                                    <option value="">All Locales</option>
                                    {locale.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
                                </select>
                            </div>
                            
                            <div>
                                <InputLabel value="Filter by Role" className="mb-1" />
                                <select
                                    className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm w-full"
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                >
                                    <option value="">All Roles</option>
                                    {roles.map(({ id, name }) => <option key={id} value={name}>{name}</option>)}
                                </select>
                            </div>
                        </div>
                    )}
                    
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                        <table className="w-full min-w-max table-auto text-left font-poppins">
                            <thead>
                                <tr className="bg-gray-50">
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-100 p-4">
                                            <div className="flex items-center gap-2">
                                                <Typography className="font-semibold text-sm leading-none opacity-70 font-poppins">
                                                    {head}
                                                </Typography>
                                                {head !== "SN" && head !== "Actions" && head !== "Status" && (
                                                    <button 
                                                        onClick={() => handleSort(head.toLowerCase().replace(' ', '_'))} 
                                                        className="text-gray-500 hover:text-yellow-600 transition-colors"
                                                    >
                                                        {sortField === head.toLowerCase().replace(' ', '_') ? (
                                                            sortDirection === 'asc' ? <RiSortAsc /> : <RiSortDesc />
                                                        ) : (
                                                            <RiSortAsc className="opacity-40" />
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={TABLE_HEAD.length} className="p-8 text-center">
                                            <div className="flex justify-center">
                                                <Spinner className="h-8 w-8" color="amber" />
                                            </div>
                                        </td>
                                    </tr>
                                ) : currentUsers.length > 0 ? (
                                    currentUsers.map(({ id, first_name, last_name, email, local, phone, roles, admin_approved }, index) => {
                                        const isLast = index === currentUsers.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                        const actualIndex = indexOfFirstUser + index + 1;
                                        
                                        return (
                                            <tr key={id} className="hover:bg-gray-50">
                                                <td className={classes}><Typography className="font-medium font-poppins text-sm">{actualIndex}</Typography></td>
                                                <td className={classes}><Typography className="font-medium font-poppins text-sm">{first_name}</Typography></td>
                                                <td className={classes}><Typography className="font-medium font-poppins text-sm">{last_name}</Typography></td>
                                                <td className={classes}><Typography className="font-medium font-poppins text-sm">{email}</Typography></td>
                                                <td className={classes}><Typography className="font-medium font-poppins text-sm">{phone}</Typography></td>
                                                <td className={classes}><Typography className="font-medium font-poppins text-sm">{getLocale(local)}</Typography></td>
                                                <td className={classes}>
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                        {getRoleName(roles)}
                                                    </span>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex gap-2">
                                                        <Button 
                                                            size="sm" 
                                                            variant="text" 
                                                            className="flex items-center gap-1 text-blue-500 p-1"
                                                            onClick={() => { openAddEditModal('edit', id) }}
                                                        >
                                                            <RiEdit2Line /> Edit
                                                        </Button>
                                                        {isUserAllowed(permissions, ["delete_users"], role) && (
                                                            <Button 
                                                                size="sm" 
                                                                variant="text" 
                                                                className="flex items-center gap-1 text-red-500 p-1"
                                                                onClick={() => { openDeleteModal(id) }}
                                                            >
                                                                <RiDeleteBin6Line /> Delete
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    {admin_approved === 0 ? (
                                                        <Button 
                                                            size="sm"
                                                            variant="filled"
                                                            color="green"
                                                            className="flex items-center gap-1 bg-green-600 text-white normal-case"
                                                            onClick={() => { onHandleAdminAproval(id) }}
                                                            disabled={processingApproval}
                                                        >
                                                            {processingApproval ? (
                                                                <Spinner className="h-4 w-4" />
                                                            ) : (
                                                                <>
                                                                    <RiCheckLine /> Approve
                                                                </>
                                                            )}
                                                        </Button>
                                                    ) : (
                                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                            Approved
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                                            <Typography className="font-medium font-poppins">No users found</Typography>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    {filteredUsers.length > usersPerPage && (
                        <div className="flex justify-center mt-6">
                            <div className="flex gap-2">
                                <Button 
                                    size="sm" 
                                    variant="outlined"
                                    disabled={currentPage === 1}
                                    onClick={() => paginate(currentPage - 1)}
                                >
                                    Previous
                                </Button>
                                
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <Button
                                        key={i}
                                        size="sm"
                                        variant={currentPage === i + 1 ? "filled" : "text"}
                                        className={currentPage === i + 1 ? "bg-yellow-500" : ""}
                                        onClick={() => paginate(i + 1)}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                                
                                <Button 
                                    size="sm" 
                                    variant="outlined"
                                    disabled={currentPage === totalPages}
                                    onClick={() => paginate(currentPage + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal show={addEditModal} onClose={closeAddEditModal} maxWidth={'2xl'}>
                <div className="delete-modal px-6 py-8 relative font-poppins">
                    <h1 className='font-bold text-2xl font-poppins'>{modalTitle} User</h1>
                    <div className="absolute -top-8 -right-8 text-white cursor-pointer">
                        <RiCloseLargeFill strokeWidth={1.5} size={38} onClick={closeAddEditModal} />
                    </div>
                    <div className="modal-content pt-6">
                        <form onSubmit={addEditSubmit}>
                            <div className="form-item mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel value="First Name" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="first_name"
                                            type="text"
                                            name="first_name"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="First Name..."
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel value="Last Name" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="last_name"
                                            type="text"
                                            name="last_name"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="Last Name..."
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-item mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel value="Email" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="Email Address..."
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            readOnly={formType === '_edit'}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel value="Phone" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="phone"
                                            type="text"
                                            name="phone"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="Phone Number..."
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-item mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel value="Password" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            className="w-full rounded-md font-poppins"
                                            placeholder={formType === '_edit' ? "Leave blank to keep current password" : "Password..."}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel value="Confirm Password" className='mb-1 font-poppins font-semibold' />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            className="w-full rounded-md font-poppins"
                                            placeholder="Confirm Password..."
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-item mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel value="Locale" className='mb-1 font-poppins font-semibold' />
                                        <select
                                            name="local"
                                            className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm w-full"
                                            value={data.local}
                                            onChange={(e) => setData('local', e.target.value)}
                                        >
                                            <option value="">Select Locale</option>
                                            {locale.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
                                        </select>
                                        <InputError message={errors.local} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel value="Role" className='mb-1 font-poppins font-semibold' />
                                        <select
                                            name="role"
                                            className="border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm w-full"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                        >
                                            <option value="">Select Role</option>
                                            {roles.map(({ id, name }) => <option key={id} value={name}>{name}</option>)}
                                        </select>
                                        <InputError message={errors.role} className="mt-2" />
                                    </div>
                                </div>
                            </div>
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
                                        'Save User'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal show={deleteModal} onClose={closeDeleteModal} maxWidth={'xl'}>
                <div className="delete-modal px-6 py-8 relative font-poppins">
                    <h1 className='font-bold text-2xl text-center'>Confirm User Deletion</h1>
                    <p className="text-center text-gray-600 mt-4">
                        Are you sure you want to delete this user? This action cannot be undone.
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
                            Delete User
                        </Button>
                    </div>
                </div>
            </Modal>
        </Authenticated>
    )
}
