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
    IconCalendar,
    IconCategory,
    IconChevronDown,
    IconChevronRight,
    IconLocation,
    IconMap,
    IconMenu2,
    IconPin,
    IconUsers,
} from "@tabler/icons-react";
import ApplicationLogo from "./ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Sidebar({ current, toggle, setToggle }) {
    const [open, setOpen] = useState(current);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const currentRoute = route().current();
    return (
        <Card className="rounded-none md:bg-[#212b36] border-b-2 md:border-b-[0] text-white shadow-none">
            <div className="desktop-view hidden md:block">
                <div className="mb-2 bg-white p-4 ">
                    <ApplicationLogo />
                </div>
                <div className="side-menu p-4">
                    <List className="text-white">
                        <Link
                            href={route("dashboard")}
                            className={`${currentRoute === "dashboard"
                                ? "bg-blue-gray-50/50 rounded-lg"
                                : ""
                                }`}
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
                            icon={
                                <IconChevronDown
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                                        }`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 1}>
                                <AccordionHeader
                                    className="border-b-0 p-3 text-white"
                                    onClick={() => handleOpen(1)}
                                >
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
                                        className={`${currentRoute === "admin.blogs.index"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
                                    >
                                        <ListItem>
                                            <ListItemPrefix>
                                                <IconChevronRight
                                                    strokeWidth={3}
                                                    className="h-3 w-5"
                                                />
                                            </ListItemPrefix>
                                            <Typography className="mr-auto font-poppins font-medium">
                                                All Blogs
                                            </Typography>
                                        </ListItem>
                                    </Link>
                                    <Link
                                        href={route("admin.blogs.add")}
                                        className={`${currentRoute === "admin.blogs.add"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
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
                                    <Link
                                        href={route(
                                            "admin.blogs.categories.index"
                                        )}
                                        className={`${currentRoute ===
                                            "admin.blogs.categories.index"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
                                    >
                                        <ListItem>
                                            <ListItemPrefix>
                                                <IconChevronRight
                                                    strokeWidth={3}
                                                    className="h-3 w-5"
                                                />
                                            </ListItemPrefix>
                                            <Typography className="mr-auto font-poppins font-medium">
                                                Categories
                                            </Typography>
                                        </ListItem>
                                    </Link>
                                    <Link
                                        href={route("admin.blogs.tags.index")}
                                        className={`${currentRoute ===
                                            "admin.blogs.tags.index"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
                                    >
                                        <ListItem>
                                            <ListItemPrefix>
                                                <IconChevronRight
                                                    strokeWidth={3}
                                                    className="h-3 w-5"
                                                />
                                            </ListItemPrefix>
                                            <Typography className="mr-auto font-poppins font-medium">
                                                Tags
                                            </Typography>
                                        </ListItem>
                                    </Link>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion
                            open={open === 2}
                            icon={
                                <IconChevronDown
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                                        }`}
                                />
                            }
                        >
                            <ListItem className="p-0" selected={open === 2}>
                                <AccordionHeader
                                    onClick={() => handleOpen(2)}
                                    className="border-b-0 p-3 text-white"
                                >
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
                                        className={`${currentRoute ===
                                            "admin.events.index"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
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

                                    <Link
                                        href={route("admin.events.add")}
                                        className={`${currentRoute === "admin.events.add"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
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
                                </List>
                            </AccordionBody>
                        </Accordion>

                        <Link
                            href={route("admin.users.index")}
                            className={`${currentRoute === "admin.users.index"
                                ? "bg-blue-gray-50/50 rounded-lg"
                                : ""
                                }`}
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
                        <Link
                            href={route('admin.location.index')}
                            className={`${currentRoute === "admin.location.index"
                                ? "bg-blue-gray-50/50 rounded-lg"
                                : ""
                                }`}
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
                    </List>
                </div>
            </div>
            <div className="mobile-view md:hidden w-11/12 mx-auto flex justify-between flex-row">
                <div className="mb-2 bg-white p-4 ">
                    <ApplicationLogo />
                </div>
                <button
                    className="hamburger-menu-mobile"
                    onClick={() => setToggle(!toggle)}
                >
                    <IconMenu2 color="black" size={32} strokeWidth={1.5} />
                </button>
                <div
                    className={`${!toggle ? "close" : "open"
                        } bg-[#212b36] side-menu ptphg-4 absolute left-0 top-[92px] h-screen w-[190px] md:top-[87px]`}
                    style={{ display: toggle ? "flex" : "none" }}
                >
                    <List className="text-white">
                        <Link
                            href={route("dashboard")}
                            className={`${currentRoute === "dashboard"
                                ? "bg-blue-gray-50/50 rounded-lg w-[175px]"
                                : ""
                                }`}
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
                            icon={
                                <IconChevronDown
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                                        }`}
                                />
                            }
                        >
                            <ListItem
                                className="p-0 menu-details"
                                selected={open === 1}
                            >
                                <AccordionHeader
                                    className="border-b-0 p-3 text-white"
                                    onClick={() => handleOpen(1)}
                                >
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
                                        className={`${currentRoute === "admin.blogs.index"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
                                    >
                                        <ListItem className="menu-details">
                                            <ListItemPrefix>
                                                <IconChevronRight
                                                    strokeWidth={3}
                                                    className="h-3 w-5"
                                                />
                                            </ListItemPrefix>
                                            <Typography className="mr-auto font-poppins font-medium">
                                                All Blogs
                                            </Typography>
                                        </ListItem>
                                    </Link>
                                    <Link
                                        href={route("admin.blogs.add")}
                                        className={`${currentRoute === "admin.blogs.add"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
                                    >
                                        <ListItem className="menu-details">
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
                                    <Link
                                        href={route(
                                            "admin.blogs.categories.index"
                                        )}
                                        className={`${currentRoute ===
                                            "admin.blogs.categories.index"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
                                    >
                                        <ListItem className="menu-details">
                                            <ListItemPrefix>
                                                <IconChevronRight
                                                    strokeWidth={3}
                                                    className="h-3 w-5"
                                                />
                                            </ListItemPrefix>
                                            <Typography className="mr-auto font-poppins font-medium">
                                                Categories
                                            </Typography>
                                        </ListItem>
                                    </Link>
                                    <Link
                                        href={route("admin.blogs.tags.index")}
                                        className={`${currentRoute ===
                                            "admin.blogs.tags.index"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
                                    >
                                        <ListItem className="menu-details">
                                            <ListItemPrefix>
                                                <IconChevronRight
                                                    strokeWidth={3}
                                                    className="h-3 w-5"
                                                />
                                            </ListItemPrefix>
                                            <Typography className="mr-auto font-poppins font-medium">
                                                Tags
                                            </Typography>
                                        </ListItem>
                                    </Link>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion
                            open={open === 2}
                            icon={
                                <IconChevronDown
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                                        }`}
                                />
                            }
                        >
                            <ListItem
                                className="p-0 menu-details"
                                selected={open === 2}
                            >
                                <AccordionHeader
                                    onClick={() => handleOpen(2)}
                                    className="border-b-0 p-3 text-white"
                                >
                                    <ListItemPrefix>
                                        <IconCalendar strokeWidth={1.5} />
                                    </ListItemPrefix>
                                    <Typography className="mr-auto font-poppins font-medium">
                                        Events
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1">
                                <List className="p-0 text-white menu-details">
                                    <Link
                                        href={route("admin.events.index")}
                                        className={`${currentRoute ===
                                            "admin.events.index"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
                                    >
                                        <ListItem className="menu-details">
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

                                    <Link
                                        href={route("admin.events.add")}
                                        className={`${currentRoute === "admin.events.add"
                                            ? "bg-blue-gray-50/50 rounded-lg"
                                            : ""
                                            }`}
                                    >
                                        <ListItem className="menu-details">
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
                                </List>
                            </AccordionBody>
                        </Accordion>

                        <Link
                            href={route("admin.users.index")}
                            className={`${currentRoute === "admin.users.index"
                                ? "bg-blue-gray-50/50 rounded-lg"
                                : ""
                                }`}
                        >
                            <ListItem className="menu-details">
                                <ListItemPrefix>
                                    <IconUsers strokeWidth={1.5} />
                                </ListItemPrefix>
                                <Typography className="mr-auto font-poppins font-medium">
                                    Users
                                </Typography>
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </div>
        </Card>
    );
}
