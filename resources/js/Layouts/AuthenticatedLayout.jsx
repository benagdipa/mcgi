import React, { useState, useEffect } from "react";
import Sidebar from "@/Components/Sidebar";
import AdminHeader from "@/Components/Admin/AdminHeader";
import { LuPanelLeftClose ,LuPanelLeftOpen} from "react-icons/lu";
import { Toaster, toast } from 'react-hot-toast';
import { usePage } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {
    const [toggle, setToggle] = useState(true);
    const { flash } = usePage().props;

    // Display flash messages as toasts
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        
        if (flash.error) {
            toast.error(flash.error);
        }
        
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    const onSetToggleHandler = () => {
    
        setToggle(!toggle);
    };
    const currentRoute = route().current();

    const findCategoryIndex = (searchString) => {
        const categoryMap = {
            blogs: 1,
            events: 2,
        };
        const routesArray = [
            "admin.blogs.index",
            "admin.blogs.add",
            "admin.blogs.categories.index",
            "admin.blogs.tags.index",
            "admin.events.index",
            "admin.events.add",
            "admin.events.view",
            "admin.events.attendances.index",
        ];
        for (let i = 0; i < routesArray.length; i++) {
            if (routesArray[i].includes(searchString)) {
                const parts = searchString.split(".");
                for (const category in categoryMap) {
                    if (parts.includes(category)) {
                        return categoryMap[category];
                    }
                }
            }
        }
        return 0;
    };

    return (
        <React.Fragment>
            <Toaster position="top-right" toastOptions={{
                duration: 4000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                success: {
                    style: {
                        background: '#22c55e',
                    },
                },
                error: {
                    style: {
                        background: '#ef4444',
                    },
                },
            }} />
            <div className="desktop-view h-screen w-full">
                <AdminHeader user={user} />
                <div className="w-full">
                    <div className="flex relative">
                    {!toggle && <div className="absolute top-[15px] left-[15px] cursor-pointer z-[20]" onClick={onSetToggleHandler}>
                                <LuPanelLeftOpen size={36}/>
                            </div>}
                        <aside
                            className={`main-sidebar bg-[#212b36] w-[20rem] fixed  z-[100] h-screen ${
                                toggle ? " lg:block" : "hidden "
                            } `}
                        >
                            <div className="absolute top-[15px] right-[20px] cursor-pointer z-[20]" onClick={onSetToggleHandler}>
                                <LuPanelLeftClose size={32} color="white"/>
                            </div>
                            <div className="fixed top-0 left-0 right-0 bottom-0 bg-transparent block lg:hidden" onClick={onSetToggleHandler}></div>
                            <Sidebar
                                current={findCategoryIndex(currentRoute)}
                            />
                        </aside>
                        <div
                            className={`main-content  w-full ${
                                toggle ? " lg:ml-[20rem]" : "ml-[4rem]"
                            } ]`}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
