import React from 'react'
import Dropdown from '../Dropdown'
import { Link } from '@inertiajs/react'
import { IconChevronDown, IconUser } from '@tabler/icons-react'

export default function AdminHeader({ user }) {
    return (
        <div className='admin-header flex justify-end py-6 px-6 shadow-sm'>
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
    )
}
