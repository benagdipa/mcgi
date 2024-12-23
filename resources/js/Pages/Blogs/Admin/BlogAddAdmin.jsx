import React, { useState, useRef, useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import { convertToHTML } from "@/Utils/convertToHtml";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
export default function MediumLikeEditor({ auth, categories, tags }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: '',
        slug: "fewfew",
        categories: [],
        tags: [],
        featureImage: null,
        status: "draft",
    });
    const [convertedData, setConvertedData] = useState('');
    const [previewFile, setPreviewFile] = useState("");
    const editorRef = useRef(null);
    const hiddenFileInput = useRef(null);
    const [fileName, setFileName] = useState("");
    const initializeEditor = () => {
        editorRef.current = new EditorJS({
            holder: "editorjs",
            tools: {
                header: Header,
                list: List,
                embed: Embed,
                inlineCode: InlineCode,
            },
            onChange: async () => {
                const content = await editorRef.current.save();
                const convertedDataTemp = convertToHTML(content, convertedData);
                setConvertedData(convertedDataTemp);
            },
            placeholder: "Start writing your blog here...",
        });
    };

    useEffect(() => {
        setData('content', convertedData);
    }, [convertedData]);

    useEffect(() => {
        initializeEditor();
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    const formSubmit = async (e) => {
        e.preventDefault();
        post(route("admin.blogs.store"));
    };

    const handleCheckBoxChange = (name, ele) => {
        const { value, checked } = ele.target;
        if (checked) {
            const prevItems = data[name];
            setData(name, [...prevItems, value]);
        } else {
            const filteredItems = data[name].filter((item) => item !== value);
            setData(name, filteredItems);
        }
    };
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleFileChange = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        setData("featureImage", event.target.files[0]);
        setFileName(event.target.files[0].name);
        setPreviewFile(url);
    };

    return (
        <Authenticated user={auth?.user}>
            <Head title="Write a New Blog" />
            <div className="py-6 px-4 bg-gray-100">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <div className="border-b pb-4 mb-6">
                        <h1 className="text-3xl font-semibold text-gray-800">Write a New Blog</h1>
                    </div>
                    <form onSubmit={formSubmit}>
                        <div className="mb-6">
                            <input
                                type="text"
                                className="w-full text-2xl font-semibold border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Blog Title"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <div id="editorjs" className="border rounded-lg p-4 bg-gray-50 min-h-[300px]"></div>
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                            )}
                        </div>

                        <div className="mb-6">
                        <InputLabel
                                        value={"Slug"}
                                        className="mb-1 font-poppins font-semibold"
                                    />
                            <input
                                type="text"
                                className="w-full text-lg border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Slug (URL)"
                                value={data.slug}
                                onChange={(e) => setData("slug", e.target.value)}
                            />
                            {errors.slug && (
                                <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                            )}
                        </div>

                        <div className="mb-6">
                        <InputLabel
                                        value={"Categories"}
                                        className="mb-1 font-poppins font-semibold"
                                    />
                            <div className="flex flex-wrap gap-4 mt-2">
                                {categories.map((category) => (
                                    <label key={category.id} className="flex items-center gap-2 text-gray-600">
                                        <input
                                            type="checkbox"
                                            value={category.id}
                                            onChange={(e) => handleCheckBoxChange('categories', e)}
                                            className="text-blue-500 focus:ring-blue-500"
                                        />
                                        <span>{category.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                        <InputLabel
                                        value={"Tags"}
                                        className="mb-1 font-poppins font-semibold"
                                    />
                            <div className="flex flex-wrap gap-4 mt-2">
                                {tags.map((tag) => (
                                    <label key={tag.id} className="flex items-center gap-2 text-gray-600">
                                        <input
                                            type="checkbox"
                                            value={tag.id}
                                            onChange={(e) => handleCheckBoxChange('tags', e)}
                                            className="text-blue-500 focus:ring-blue-500"
                                        />
                                        <span>{tag.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                 
                          
                                <div className="form-item mb-4">
                                <div className="featured-image">
                                    <InputLabel
                                        value={"Featured Image"}
                                        className="mb-1 font-poppins font-semibold"
                                    />
                                    <div className="categories-items border p-4 rounded-md">
                                        <img src={previewFile} />
                                        <input
                                            type="file"
                                            name="featureImage"
                                            hidden
                                            onChange={
                                                handleFileChange
                                            }
                                            ref={hiddenFileInput}
                                            value={""}
                                        />
                                        <a
                                            className="bg-transparent cursor-pointer"
                                            onClick={handleClick}
                                        >
                                            Set Featured Image
                                        </a>
                                        <InputError
                                            message={
                                                errors.featureImage
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="mb-6">
                            <select
                                className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                            >
                                <option value="draft">Draft</option>
                                <option value="publish">Publish</option>
                            </select>
                        </div>

                        <div className="text-right">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                                disabled={processing}
                            >
                                {processing ? "Saving..." : "Publish"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
