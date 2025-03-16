import { Link } from "@inertiajs/react";
import React from "react";

export default function ApplicationLogo(props) {
    const { className } = props;
    return (
        <React.Fragment>
            <Link href="/">
                <img src='/images/logo.png' alt="MCGI Australia Logo" className={className || "w-[200px]"} />
            </Link>
        </React.Fragment>
    );
}
