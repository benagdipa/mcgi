import React, { useState } from "react";
import Sidebar from "@/Components/Sidebar";
import AdminHeader from "@/Components/Admin/AdminHeader";

export default function Authenticated({ user, header, children }) {
    const [toggle, setToggle] = useState(false);
    const currentRoute = route().current()

    const findCategoryIndex = (searchString) => {
        const categoryMap = {
            'blogs': 1,
            'events': 2
        };
        const routesArray = ["admin.blogs.index", "admin.blogs.add", "admin.blogs.categories.index", "admin.blogs.tags.index", "admin.events.index", "admin.events.add"];
        for (let i = 0; i < routesArray.length; i++) {
            if (routesArray[i].includes(searchString)) {
                const parts = searchString.split('.');
                for (const category in categoryMap) {
                    if (parts.includes(category)) {
                        return categoryMap[category];
                    }
                }
            }
        }
        return 0;
    }

    return (
        <React.Fragment>
            <div className="desktop-view hidden md:flex h-screen w-full">
                <aside className="main-sidebar bg-[#212b36] w-[20rem] fixed h-screen">
                    <Sidebar current={findCategoryIndex(currentRoute)} />
                </aside>
                <div className="w-full ml-[20rem]">
                    <AdminHeader user={user} />
                    <div className="main-content">
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}