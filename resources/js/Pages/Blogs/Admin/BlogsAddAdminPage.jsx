import React from 'react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function BlogsAddAdminPage({ auth }) {



    return (
        <Authenticated user={auth?.user}>
            <Head title='Add New Blogs' />
            <div className="">
                <div className="p-6 flex justify-between">
                    <h1 className='font-bold font-xl'>Add New Blog</h1>
                </div>
                <div className="form-wrapper px-6">
                    <div className="flex">
                        <div className="w-7/12">
                            <div className="form-item mb-4">
                                <InputLabel value={'Title'} className='mb-1 font-dmsans' />
                                <TextInput
                                    className="w-full rounded-sm font-dmsans placeholder:font-dmsans"
                                />
                            </div>
                            <div className="form-item">
                                <InputLabel value={'Content'} className='mb-1 font-dmsans' />
                                <div className="custom-ckeditor" style={{ height: '400px' }}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data="<p>Hello, CKEditor!</p>"                                        
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            console.log({ event, editor, data });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-5/12"></div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
