import { Link } from "@inertiajs/react";
import React from "react";

export default function ApplicationLogo(props) {
    const { className } = props
    return (
        <React.Fragment>
            <Link href="/">
                <img src='/images/logo.png' width={200} className={className}/>
            </Link>
        </React.Fragment>
    );
}
