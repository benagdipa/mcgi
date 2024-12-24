
import React from 'react'
import Dropdown from '../Dropdown'
import { Link } from '@inertiajs/react'
import { AiOutlineBell, AiOutlineDown, AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { Badge } from '@material-tailwind/react'
import ApplicationLogo from '../ApplicationLogo'
import { useState } from 'react'

export default function AdminHeader({ user ,onSetToggleHandler}) {
    return (
        <div className='admin-header w-full sticky top-0 flex items-center py-3 lg:px-6 px-3 border-b font-poppins bg-white z-50'>
            <div className="left lg:w-[20rem]">
                <ApplicationLogo />
            </div>
            <div className="right flex lg:justify-between justify-end gap-4 w-full">
                <div className="search hidden md:block ps-5">
                    {/* <input type="text" placeholder='Search...' className='rounded border-gray-400/80 w-[300px] focus:ring-0 ring-0' /> */}
                </div>
                <div className="flex gap-4 items-center justify-end">
                    <Badge color="red">
                        <div className=" w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                            <AiOutlineBell strokeWidth={1.5} color='grey' />
                        </div>
                    </Badge>
                    {user && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="flex items-center gap-1">
                                    <AiOutlineUser size={22} strokeWidth={1.5} />
                                    <button type="button" className="">{user?.first_name}</button>
                                    <AiOutlineDown size={22} strokeWidth={1.5} />
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
                {/* <button className='lg:hidden'  onClick={() => onSetToggleHandler()}>
                    <AiOutlineMenu size={32} strokeWidth='1' />
                </button> */}
            </div>
        </div>
    )
}
