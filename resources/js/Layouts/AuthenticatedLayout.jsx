import React, { useState } from "react";
import Sidebar from "@/Components/Sidebar";
import AdminHeader from "@/Components/Admin/AdminHeader";

export default function Authenticated({ user, header, children }) {
    const [toggle, setToggle] = useState(false);
    const onSetToggleHandler=()=>{
        setToggle(!toggle);
    }
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
            <div className="desktop-view h-screen w-full">
                <AdminHeader onSetToggleHandler={onSetToggleHandler} user={user} />
                <div className="w-full">
                    <div className="flex">
                    <aside className={`main-sidebar bg-[#212b36] w-[20rem] fixed h-screen ${toggle ? 'block' : 'hidden'} lg:block`}>
                            <Sidebar current={findCategoryIndex(currentRoute)} />
                        </aside>
                        <div className={`main-content  w-full ${toggle ? 'ml-[20rem]' : 'ml-0'} lg:ml-[20rem]` }>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
