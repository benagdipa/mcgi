import React, { useState } from "react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Collapse,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useDropzone } from "react-dropzone";
import InputError from "@/Components/InputError";
import { IconX } from "@tabler/icons-react";

const BannerAdminPage = ({ auth, banners, titles, ids }) => {
    const {
        data,
        setData,
        post,

        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm({
        title: "",
        banners: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [toggleOpen, setToggleOpen] = useState(false);
    const [uploadedImages, setUploadedImages] = useState("");

    const toggleCollapse = () => {
        setToggleOpen(!toggleOpen);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
          
            if (data.banners[0]?.size / (1024 * 1024)>2) {
                setData('banners',[]);
                setImageUploadError(
                    "Image Size should equal or less than 2 mb"
                );
            } else {
                setImageUploadError('');
                formData.append("banners", data.banners[0]);
                formData.append("title", data.title);

                post(route("admin.banner.store", formData), {
                    onSuccess: () => {
                        setToggleOpen(false);
                        reset();
                    },
                    onError: (error) => {
                        console.log(error);
                    },
                });
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    const handleRemoveUploadImage = (file, indexToRemove) => {
        const tempFileArray = [...data?.banners];
        const fileAfterDelete = tempFileArray.filter((itm, index) => {
            return index !== indexToRemove;
        });
        setData("banners", fileAfterDelete);
    };

    const thumbs = data?.banners?.map((file, index) => (
        <div
            key={index}
            className="border border-gray-300 rounded relative w-36 h-36 p-1"
        >
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white p-1 cursor-pointer">
                <IconX
                    size={16}
                    onClick={() => {
                        handleRemoveUploadImage(file, index);
                    }}
                />
            </div>
            <img
                src={file.preview}
                className="w-full h-full object-cover rounded"
                alt={`Thumbnail ${index}`}
            />
        </div>
    ));

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setData("banners", URL.createObjectURL(file));
        },
    });

    const onDeleteHandler = (id) => {
        destroy(route("admin.banner.delete", id));
    };

    return (
        <Authenticated user={auth?.user}>
            <div className="content py-4 font-poppins">
                <div className="content-header px-6 flex justify-between items-center">
                    <div className="left">
                        <h1 className="font-semibold text-gray-800 text-3xl">
                            Banners
                        </h1>
                        <div className="pt-2">
                            <ul className="flex gap-1 text-gray-600 text-sm">
                                <li>
                                    <Link href={route("dashboard")}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>/</li>
                                <li>
                                    <Link href={route("admin.album.index")}>
                                        Banner
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <button
                            className="bg-[#f5cd06] shadow-lg text-[#0f0f0f] px-5 py-3 rounded-md font-semibold text-lg font-poppins"
                            onClick={toggleCollapse}
                        >
                            Add New
                        </button>
                    </div>
                </div>
                <div>
                    <Collapse open={toggleOpen}>
                        <Card className="px-6">
                            <form onSubmit={formSubmit}>
                                <div className="mb-6">
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="my-3"
                                    >
                                        Title
                                    </Typography>

                                    <Input
                                        size="lg"
                                        placeholder="enter banner title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        className="my-3"
                                    >
                                        Update Banner
                                    </Typography>
                                    <Input
                                        type="file"
                                        size="lg"
                                        onChange={(e) => {
                                            setImageUploadError('')
                                            setData("banners", [
                                                ...(data.banners || []),
                                                ...[...e.target.files].map(
                                                    (file) =>
                                                        Object.assign(file, {
                                                            preview:
                                                                URL.createObjectURL(
                                                                    file
                                                                ),
                                                        })
                                                ),
                                            ]);
                                        }}
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                    <InputError
                                        message={imageUploadError?imageUploadError:errors.banners}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="font-item mb-4 text-right">
                                    <button
                                        className="bg-blue-500 text-white px-6 py-3 font-poppins rounded-sm font-bold"
                                        disabled={processing}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </form>
                        </Card>
                    </Collapse>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    {banners.map((itm, index) => {
                        return (
                            <Card className="mt-6 mx-8 w-[450px]">
                                <div className="flex">
                                    <div className="mr-8">
                                        <img
                                            src={`${itm}`}
                                            alt={`${titles[index]}`}
                                            className="h-[100px] w-[100px]"
                                        />
                                    </div>
                                    <div className="flex w-[60%] justify-between items-center">
                                        <Typography
                                            variant="h5"
                                            color="blue-gray"
                                            className=""
                                        >
                                            {titles[index]}
                                        </Typography>
                                        <button
                                            className="bg-red-500  text-white py-1 px-3 text-xs font-poppins rounded-sm font-bold"
                                            disabled={processing}
                                            onClick={() =>
                                                onDeleteHandler(ids[index])
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </Authenticated>
    );
};

export default BannerAdminPage;
