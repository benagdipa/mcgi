import React, { useEffect, useState } from 'react'
import { Card, Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
import { IconCalendar, IconCategory, IconChevronDown, IconChevronRight, IconPin } from '@tabler/icons-react';
import ApplicationLogo from './ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Sidebar({ current }) {
    const [open, setOpen] = useState(current);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    const currentRoute = route().current()
    return (
        <div className='main-sidebar'>
            <Card className="h-screen w-full max-w-[20rem] p-4 rounded-none font-dmsans">
                <div className="mb-2 p-4">
                    <ApplicationLogo />
                </div>
                <List>
                    <ListItem>
                        <ListItemPrefix><IconCategory strokeWidth={1.5} /></ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-dmsans font-semibold">Dashboard</Typography>
                    </ListItem>
                    <Accordion
                        open={open === 1}
                        icon={<IconChevronDown strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}
                    >
                        <ListItem className="p-0" selected={open === 1}>
                            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                <ListItemPrefix><IconPin strokeWidth={1.5} /></ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-dmsans font-semibold">Blogs</Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <Link href={route('admin.blogs.index')} className={`${currentRoute === 'admin.blogs.index' ? 'bg-blue-gray-50/50' : ''}`} preserveState preserveScroll>
                                    <ListItem>
                                        <ListItemPrefix><IconChevronRight strokeWidth={3} className="h-3 w-5" /></ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-dmsans font-semibold">All Blogs</Typography>
                                    </ListItem>
                                </Link>
                                <Link href={route('admin.blogs.add')} className={`${currentRoute === 'admin.blogs.add' ? 'bg-blue-gray-50/50' : ''}`} preserveState preserveScroll>
                                    <ListItem>
                                        <ListItemPrefix><IconChevronRight strokeWidth={3} className="h-3 w-5" /></ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-dmsans font-semibold">Add New</Typography>
                                    </ListItem>
                                </Link>
                                <Link href={route('admin.blogs.categories.index')} className={`${currentRoute === 'admin.blogs.categories.index' ? 'bg-blue-gray-50/50' : ''}`} preserveState preserveScroll>
                                    <ListItem>
                                        <ListItemPrefix><IconChevronRight strokeWidth={3} className="h-3 w-5" /></ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-dmsans font-semibold">Categories</Typography>
                                    </ListItem>
                                </Link>
                                <Link href={route('admin.blogs.tags.index')} className={`${currentRoute === 'admin.blogs.tags.index' ? 'bg-blue-gray-50/50' : ''}`} preserveState preserveScroll>
                                    <ListItem>
                                        <ListItemPrefix><IconChevronRight strokeWidth={3} className="h-3 w-5" /></ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-dmsans font-semibold">Tags</Typography>
                                    </ListItem>
                                </Link>
                            </List>
                        </AccordionBody>
                    </Accordion>

                    <Accordion
                        open={open === 2}
                        icon={<IconChevronDown strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />}
                    >
                        <ListItem className="p-0" selected={open === 2}>
                            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                <ListItemPrefix><IconCalendar strokeWidth={1.5} /></ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-dmsans font-semibold">Events</Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem>
                                    <ListItemPrefix><IconChevronRight strokeWidth={3} className="h-3 w-5" /></ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-dmsans font-semibold">All Events</Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemPrefix><IconChevronRight strokeWidth={3} className="h-3 w-5" /></ListItemPrefix>
                                    <Typography color="blue-gray" className="mr-auto font-dmsans font-semibold">Add New</Typography>
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                </List>
            </Card>
        </div>
    )
}
