import React from "react";
import Sidebar from "@/Components/Sidebar";
import AdminHeader from "@/Components/Admin/AdminHeader";

export default function Authenticated({ user, header, children }) {

    const currentRoute = route().current()

    const findCategoryIndex = (searchString) => {
        const categoryMap = {
            'blogs': 1,
            'events': 2
        };
        const routesArray = ["admin.blogs.index", "admin.blogs.add", "admin.blogs.categories.index", "admin.blogs.tags.index", "events.index"];
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
            <div className="flex h-screen">
                <aside>
                    <Sidebar current={findCategoryIndex(currentRoute)} />
                </aside>
                <div className="w-full">
                    <AdminHeader user={user} />
                    <div className="main-content">
                        {children}
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}
