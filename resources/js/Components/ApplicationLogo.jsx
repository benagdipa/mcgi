import { Link } from "@inertiajs/react";
import React from "react";

export default function ApplicationLogo(props) {
    return (
        <React.Fragment>
            <Link href="/">
                <img src='/images/logo.png' width={250} />
            </Link>
        </React.Fragment>
    );
}
