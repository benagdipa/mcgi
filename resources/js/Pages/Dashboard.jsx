import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import { MdArticle } from "react-icons/md";
import { FaUsers,FaImages,FaCalendar ,FaUser} from "react-icons/fa";

export default function Dashboard({ auth }) {
    const { count, data } = usePage().props
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="main-content w-full">
                <div className="w-ful px-6 py-4 font-poppins">
                    <h1 className="font-semibold text-gray-800 text-3xl">Dashboard</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-6 mt-6 font-poppins'>
                    <Card>
                        <CardBody className='relative flex'>
                            <div className='flex items-center gap-4'>
                                <h1 className='font-medium text-5xl'>{count?.users}</h1>
                                <Typography variant='h4' className='font-poppins'>Users</Typography>
                            </div>
                            <div className="icon absolute top-0 right-2 flex items-center h-full">
                                <FaUser size={48}  color='silver' />
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className='flex items-center gap-4'>
                                <h1 className='font-medium text-5xl'>{count?.blogs}</h1>
                                <Typography variant='h4' className='font-poppins'>Articles</Typography>
                            </div>
                            <div className="icon absolute top-0 right-2 flex items-center h-full">
                                <MdArticle size={48}  color='silver' />
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className='flex items-center gap-4'>
                                <h1 className='font-medium text-5xl'>{count?.events}</h1>
                                <Typography variant='h4' className='font-poppins'>Events</Typography>
                            </div>
                            <div className="icon absolute top-0 right-2 flex items-center h-full">
                                <FaCalendar size={48}  color='silver' />
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className='flex items-center gap-4'>
                                <h1 className='font-medium text-5xl'>{count?.albums}</h1>
                                <Typography variant='h4' className='font-poppins'>Images</Typography>
                            </div>
                            <div className="icon absolute top-0 right-2 flex items-center h-full">
                                <FaImages size={48}  color='silver' />
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className='flex items-center gap-4'>
                                <h1 className='font-medium text-5xl'>{count?.attendees}</h1>
                                <Typography variant='h4' className='font-poppins'>Attendees</Typography>
                            </div>
                            <div className="icon absolute top-0 right-2 flex items-center h-full">
                                <FaUsers size={48}  color='silver' />
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="px-6 mt-6">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <Card>
                            <CardBody className='font-poppins px-0'>
                                <h1 className='text-2xl font-semibold px-2 pb-4'>Latest Events</h1>
                                <table className="w-full table-auto text-left">
                                    <thead>
                                        <tr>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">SN</Typography></th>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">Title</Typography></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.events?.length > 0 && data?.events?.map((item, index) => (
                                            <tr key={item.id} className='even:bg-blue-gray-50/50'>
                                                <td className="border-l h-10 text-[12px] font-medium ps-2">{index + 1}</td>
                                                <td className="border-l h-10 text-[12px] font-medium ps-2">{`${item.title}`}</td>
                                            </tr>
                                        ))}
                                        <tr></tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody className='font-poppins px-0'>
                                <h1 className='text-2xl font-semibold px-2 pb-4'>Latest Users</h1>
                                <table className='w-full table-auto text-left'>
                                    <thead>
                                        <tr>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">SN</Typography></th>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">Name</Typography></th>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer hidden lg:table-cell'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">Email</Typography></th>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer hidden lg:table-cell'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">Phone</Typography></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.users?.length > 0 && data?.users?.map((user, index) => (
                                            <tr key={user.id} className='even:bg-blue-gray-50/50'>
                                                <td className='border-l h-10 text-[12px] font-medium ps-2'>{index + 1}</td>
                                                <td className='border-l h-10 text-[12px] font-medium ps-2'>{`${user.first_name} ${user.last_name}`}</td>
                                                <td className='border-l h-10 text-[12px] font-medium ps-2 hidden lg:table-cell'>{user.email}</td>
                                                <td className='border-l h-10 text-[12px] font-medium ps-2 hidden lg:table-cell'>{user.phone}</td>
                                            </tr>
                                        ))}
                                        <tr></tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
                        <Card>
                            <CardBody className='font-poppins px-0'>
                                <h1 className='text-2xl font-semibold px-2 pb-4'>Latest Articles</h1>
                                <table className="w-full table-auto text-left">
                                    <thead>
                                        <tr>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">SN</Typography></th>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">Title</Typography></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.blogs?.length > 0 && data?.blogs?.map((item, index) => (
                                            <tr key={item.id} className='even:bg-blue-gray-50/50'>
                                                <td className="border-l h-10 text-[12px] font-medium ps-2">{index + 1}</td>
                                                <td className="border-l h-10 text-[12px] font-medium ps-2">{`${item.title}`}</td>
                                            </tr>
                                        ))}
                                        <tr></tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody className='font-poppins px-0'>
                                <h1 className='text-2xl font-semibold px-2 pb-4'>Registration Summary</h1>
                                <table className="w-full table-auto text-left">
                                    <thead>
                                        <tr>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">SN</Typography></th>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">Events Title</Typography></th>
                                            <th className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 border-l cursor-pointer'><Typography variant="small" className="leading-none text-gray-800 font-medium text-sm">Total Attendees</Typography></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.attendance_summary?.length > 0 && data?.attendance_summary?.map((item, index) => (
                                            <tr key={item.id} className='even:bg-blue-gray-50/50'>
                                                <td className="border-l h-10 text-[12px] font-medium ps-2">{index + 1}</td>
                                                <td className="border-l h-10 text-[12px] font-medium ps-2">
                                                    <Link href={route('admin.events.view', item?.id)} className='border-b border-gray-600'>
                                                        {`${item?.title}`}
                                                    </Link>
                                                </td>
                                                <td className="border-l h-10 text-[12px] font-medium ps-2">{`${item?.attendances_count}`}</td>
                                            </tr>
                                        ))}
                                        <tr></tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
