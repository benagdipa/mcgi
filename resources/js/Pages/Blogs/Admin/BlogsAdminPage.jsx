import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Card, Typography } from "@material-tailwind/react";

export default function BlogsAdminPage({ auth }) {
    const TABLE_HEAD = ["Post Title", "Categories", "Tags", "Status", "Action"];
    const TABLE_ROWS = [];
    return (
        <Authenticated user={auth?.user}>
            <Head title='Blogs' />
            <div>
                <Card className="h-full w-full overflow-scroll rounded-none">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="leading-none opacity-70 font-dmsans text-lg font-bold" >{head}</Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(({ name, job, date }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{name}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{job}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{date}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">{status}</Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">Edit</Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </div>
        </Authenticated>
    )
}
