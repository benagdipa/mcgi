import React, { useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

import {
    IconAlbum,
    IconCalendar,
    IconCategory,
    IconChevronDown,
    IconChevronRight,
    IconLocation,
    IconMailForward,
    IconMap,
    IconPin,
    IconUserCog,
    IconUsers,
    IconSlideshow,
} from "@tabler/icons-react";
import { Link, usePage } from "@inertiajs/react";
import { isUserAllowed } from "@/Utils/Utils";

export default function Sidebar({ current, toggle, setToggle }) {
    const { role, permissions } = usePage().props.auth
    const [open, setOpen] = useState(current);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const currentRoute = route().current();
    return (
        <Card className="rounded-none bg-[#212b36] border-b-[0] text-white shadow-none">
            <div className="desktop-view ">
                <div className="side-menu p-4">
                    <List className="text-white">

                        <Link
                            href={route("dashboard")}
                            className={`${currentRoute === "dashboard" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                        >
                            <ListItem>
                                <ListItemPrefix>
                                    <IconCategory strokeWidth={1.2} />
                                </ListItemPrefix>
                                <Typography className="mr-auto font-poppins font-medium">
                                    Dashboard
                                </Typography>
                            </ListItem>
                        </Link>

                        <Accordion
                            open={open === 1}
                            icon={<IconChevronDown strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}
                        >
                            <ListItem className="p-0" selected={open === 1}>
                                <AccordionHeader className="border-b-0 p-3 text-white" onClick={() => handleOpen(1)}>
                                    <ListItemPrefix>
                                        <IconPin strokeWidth={1.5} />
                                    </ListItemPrefix>
                                    <Typography className="mr-auto font-poppins font-medium">
                                        Blogs
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>

                            <AccordionBody className="py-1">
                                <List className="p-0 text-white">

                                    <Link
                                        href={route("admin.blogs.index")}
                                        className={`${currentRoute === "admin.blogs.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                                    >
                                        <ListItem>
                                            <ListItemPrefix>
                                                <IconChevronRight strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            <Typography className="mr-auto font-poppins font-medium">
                                                All Blogs
                                            </Typography>
                                        </ListItem>
                                    </Link>

                                    {/* Add Blog */}
                                    {isUserAllowed(permissions, ['create_blogs'], role) && (
                                        <Link
                                            href={route("admin.blogs.add")}
                                            className={`${currentRoute === "admin.blogs.add" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                                        >
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <IconChevronRight strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                <Typography className="mr-auto font-poppins font-medium">
                                                    Add New
                                                </Typography>
                                            </ListItem>
                                        </Link>
                                    )}

                                    {/* Categories */}
                                    {isUserAllowed(permissions, ['create_categories', 'edit_categories', 'delete_categories'], role) && (
                                        <Link
                                            href={route("admin.blogs.categories.index")}
                                            className={`${currentRoute === "admin.blogs.categories.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                                        >
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <IconChevronRight strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                <Typography className="mr-auto font-poppins font-medium">
                                                    Categories
                                                </Typography>
                                            </ListItem>
                                        </Link>
                                    )}


                                    {/* Tags */}
                                    {isUserAllowed(permissions, ['create_tags', 'edit_tags', 'delete_tags'], role) && (
                                        <Link
                                            href={route("admin.blogs.tags.index")}
                                            className={`${currentRoute === "admin.blogs.tags.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                                        >
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <IconChevronRight strokeWidth={3} className="h-3 w-5" />
                                                </ListItemPrefix>
                                                <Typography className="mr-auto font-poppins font-medium">
                                                    Tags
                                                </Typography>
                                            </ListItem>
                                        </Link>
                                    )}
                                </List>
                            </AccordionBody>
                        </Accordion>

                        {/* Events */}
                        {isUserAllowed(permissions, ['create_events', 'edit_events', 'delete_events'], role) && (
                            <Accordion
                                open={open === 2}
                                icon={<IconChevronDown strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />}
                            >
                                <ListItem className="p-0" selected={open === 2}>
                                    <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3 text-white">
                                        <ListItemPrefix>
                                            <IconCalendar strokeWidth={1.5} />
                                        </ListItemPrefix>
                                        <Typography className="mr-auto font-poppins font-medium">
                                            Events
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0 text-white">
                                        <Link
                                            href={route("admin.events.index")}
                                            className={`${currentRoute === "admin.events.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                                        >
                                            <ListItem>
                                                <ListItemPrefix>
                                                    <IconChevronRight
                                                        strokeWidth={3}
                                                        className="h-3 w-5"
                                                    />
                                                </ListItemPrefix>
                                                <Typography className="mr-auto font-poppins font-medium">
                                                    All Events
                                                </Typography>
                                            </ListItem>
                                        </Link>

                                        {/* Add Event */}
                                        {isUserAllowed(permissions, ['create_events'], role) && (
                                            <Link
                                                href={route("admin.events.add")}
                                                className={`${currentRoute === "admin.events.add" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                                            >
                                                <ListItem>
                                                    <ListItemPrefix>
                                                        <IconChevronRight
                                                            strokeWidth={3}
                                                            className="h-3 w-5"
                                                        />
                                                    </ListItemPrefix>
                                                    <Typography className="mr-auto font-poppins font-medium">
                                                        Add New
                                                    </Typography>
                                                </ListItem>
                                            </Link>
                                        )}
                                    </List>
                                </AccordionBody>
                            </Accordion>
                        )}


                        {/* Users */}
                        {isUserAllowed(permissions, ["create_users", "edit_users", "delete_users"], role) && (
                            <Link
                                href={route("admin.users.index")}
                                className={`${currentRoute === "admin.users.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                            >
                                <ListItem>
                                    <ListItemPrefix>
                                        <IconUsers strokeWidth={1.5} />
                                    </ListItemPrefix>
                                    <Typography className="mr-auto font-poppins font-medium">
                                        Users
                                    </Typography>
                                </ListItem>
                            </Link>
                        )}

                        {/* Locale */}
                        {isUserAllowed(permissions, ["create_locale", "edit_locale", "delete_locale"], role) && (
                            <Link
                                href={route('admin.locale.index')}
                                className={`${currentRoute === 'admin.locale.index' ? 'bg-blue-gray-50/50 rounded-lg' : ''}`}
                            >
                                <ListItem>
                                    <ListItemPrefix><IconLocation strokeWidth={1.2} /></ListItemPrefix>
                                    <Typography className="mr-auto font-poppins font-medium">Locale</Typography>
                                </ListItem>
                            </Link>
                        )}

                        {/* Church Locations */}
                        {isUserAllowed(permissions, ["create_church_locations", "edit_church_locations", "delete_church_locations"], role) && (
                            <Link
                                href={route('admin.location.index')}
                                className={`${currentRoute === "admin.location.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                            >
                                <ListItem>
                                    <ListItemPrefix>
                                        <IconMap strokeWidth={1.5} />
                                    </ListItemPrefix>
                                    <Typography className="mr-auto font-poppins font-medium">
                                        Church Locations
                                    </Typography>
                                </ListItem>
                            </Link>
                        )}

                        {/* Albums */}
                        {isUserAllowed(permissions, ["create_albums", "edit_albums", "delete_albums"], role) && (
                            <Link
                                href={route('admin.album.index')}
                                className={`${currentRoute === "admin.album.index" || currentRoute === "admin.album.view" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                            >
                                <ListItem>
                                    <ListItemPrefix>
                                        <IconAlbum strokeWidth={1.5} />
                                    </ListItemPrefix>
                                    <Typography className="mr-auto font-poppins font-medium">
                                        Albums
                                    </Typography>
                                </ListItem>
                            </Link>
                        )}

                        {/* Email Templates */}
                        {isUserAllowed(permissions, ["create_email_tempates", "edit_email_tempates", "delete_email_tempates"], role) && (
                            <Link
                                href={route('admin.email.index')}
                                className={`${currentRoute === "admin.email.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                            >
                                <ListItem>
                                    <ListItemPrefix>
                                        <IconMailForward strokeWidth={1.5} />
                                    </ListItemPrefix>
                                    <Typography className="mr-auto font-poppins font-medium">
                                        Email Templates
                                    </Typography>
                                </ListItem>
                            </Link>
                        )}

                        {/* Roles */}
                        {isUserAllowed(permissions, ["create_roles", "edit_roles", "delete_roles"], role) && (
                            <Link
                                href={route('admin.roles.index')}
                                className={`${currentRoute === "admin.roles.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                            >
                                <ListItem>
                                    <ListItemPrefix>
                                        <IconUserCog strokeWidth={1.5} />
                                    </ListItemPrefix>
                                    <Typography className="mr-auto font-poppins font-medium">
                                        Roles
                                    </Typography>
                                </ListItem>
                            </Link>
                        )}

                    {/* Banners */}
                    {isUserAllowed(permissions, ["create_banners", "edit_banners", "delete_banners"], role) && (
                        <Link
                            href={route('admin.banner.index')}
                            className={`${currentRoute === "admin.banner.index" ? "bg-blue-gray-50/50 rounded-lg" : ""}`}
                        >
                            <ListItem>
                                <ListItemPrefix>
                                    <IconSlideshow strokeWidth={1.5} />
                                </ListItemPrefix>
                                <Typography className="mr-auto font-poppins font-medium">
                                    Banner
                                </Typography>
                            </ListItem>
                        </Link>
                    )}

                    </List>
                </div>
            </div>
        </Card>
    );
}
