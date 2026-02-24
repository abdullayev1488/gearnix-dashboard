import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../../axios/axios";
import toast from "react-hot-toast";

export default function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [payload, setPayload] = useState({ name: "", status: "1", image: "" });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await api.get(`/category/${id}`);
                const cat = res.data.data;
                setPayload({
                    name: cat.name || "",
                    status: cat.status ? "1" : "0",
                    image: cat.images?.shop || ""
                });
                setPreview(cat.images?.shop || null);
            } catch (error) {
                toast.error("Failed to load category data");
                navigate("/categories");
            } finally {
                setFetching(false);
            }
        };
        fetchCategory();
    }, [id, navigate]);

    const handlePayload = (e, key) => {
        setPayload(prev => ({ ...prev, [key]: e.target.value }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            setPayload(prev => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setPreview(null);
        setPayload(prev => ({ ...prev, image: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!payload.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        setLoading(true);
        try {
            const res = await api.put(`/category/${id}`, {
                name: payload.name,
                image: payload.image,
                status: payload.status === "1"
            });

            if (res.data.success) {
                toast.success(res.data.message || "Category updated successfully!");
                navigate("/categories");
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to update category";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    return (
        <>
            <PageMeta
                title={`Edit Category - Gearnix Dashboard`}
                description="Edit an existing product category"
            />
            <PageBreadcrumb pageTitle="Edit Category" />
            <div className="grid grid-cols-1 gap-6">
                <ComponentCard title="Category Information">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Image Upload */}
                        <div>
                            <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                Category Image
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="relative flex flex-col items-center justify-center w-full h-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 transition overflow-hidden">
                                    {preview ? (
                                        <div className="relative w-full h-full flex items-center justify-center p-4">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="max-h-full max-w-full object-contain rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    removeImage();
                                                }}
                                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition text-sm font-bold"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, WEBP (Max: 5MB)</p>
                                        </div>
                                    )}
                                    <input
                                        onChange={handleImage}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Category Name */}
                        <div>
                            <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                Category Name
                            </label>
                            <input
                                value={payload.name}
                                onChange={(e) => handlePayload(e, "name")}
                                type="text"
                                placeholder="Enter category name"
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 text-gray-800 outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/60"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                Status
                            </label>
                            <select
                                value={payload.status}
                                onChange={(e) => handlePayload(e, "status")}
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 text-gray-800 outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            >
                                <option value="1" className="dark:bg-gray-900 text-white">Active</option>
                                <option value="0" className="dark:bg-gray-900 text-white">Inactive</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/categories")}
                                className="flex w-full justify-center rounded-lg border border-gray-300 p-3 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white/90 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center items-center gap-2 rounded-lg bg-brand-500 p-3 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading && (
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                )}
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </>
    );
}
