import { Link } from "@inertiajs/react";
import React from "react";

export default function ApplicationLogo(props) {
    const { className } = props;
    return (
        <Link href="/" className="inline-block">
            <img src='/images/logo.png' alt="MCGI Australia Logo" className={className || "w-[200px]"} />
        </Link>
    );
}
