
import React from 'react'
import Dropdown from '../Dropdown'
import { Link } from '@inertiajs/react'
import { IconBell, IconChevronDown, IconUser } from '@tabler/icons-react'
import { Badge } from '@material-tailwind/react'
import ApplicationLogo from '../ApplicationLogo'

export default function AdminHeader({ user }) {
    return (
        <div className='admin-header w-full static top-0 flex items-center py-3 px-6 border-b font-poppins bg-white z-50'>
            <div className="left w-[20rem]">
                <ApplicationLogo />
            </div>
            <div className="right flex justify-between w-full">
                <div className="search ps-5">
                    <input type="text" placeholder='Search...' className='rounded border-gray-400/80 w-[300px] focus:ring-0 ring-0' />
                </div>
                <div className="flex gap-4 items-center justify-end">
                    <Badge color="red">
                        <div className=" w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                            <IconBell strokeWidth={1.5} color='grey' />
                        </div>
                    </Badge>
                    {user && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="flex items-center gap-1">
                                    <IconUser size={22} strokeWidth={1.5} />
                                    <button type="button" className="">{user?.first_name}</button>
                                    <IconChevronDown size={22} strokeWidth={1.5} />
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
            </div>
        </div>
    )
}