import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { useState } from "react";
import axios  from "axios"

export default function AddCategory() {

    const [payload, setPayload] = useState({
        name: "",
        image: null,
        status: "1"
    })

    const handlePayload = (e, key) => {
        setPayload(prev => ({ ...prev, [key]: e.target.value }))
    }

    const handleImage = (e) => {
        console.log(e);
        //BURA HELE QALIR
    };

    const submitHandler = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/category/create', {
            ...payload,
            status: payload.status == '1' ? true : false
        })


    }

    return (
        <>
            <PageMeta
                title="New Category - Gearnix Dashboard"
                description="Create a new product category"
            />
            <PageBreadcrumb pageTitle="New Category" />
            <div className="grid grid-cols-1 gap-6">
                <ComponentCard title="Category Information">
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                Category Image
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-50  border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 transition">
                                    {!payload.image && <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>}
                                    <input onChange={handleImage} type="file" className="hidden" />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                Category Name
                            </label>
                            <input
                                onChange={(e) => handlePayload(e, "name")}
                                type="text"
                                placeholder="Enter category name"
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 text-gray-800 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/60"
                            />
                        </div>

                        <div>
                            <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                Status
                            </label>
                            <select
                                onChange={(e) => handlePayload(e, "status")}
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 text-gray-800 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                                <option value={1} className="dark:bg-gray-900 text-white">Active</option>
                                <option value={0} className="dark:bg-gray-900 text-white">Deactive</option>
                            </select>
                        </div>

                        <button className="flex w-full justify-center rounded-lg bg-brand-500 p-3 font-medium text-white transition hover:bg-opacity-90">
                            Create Category
                        </button>
                    </form>
                </ComponentCard>
            </div>
        </>
    );
}
