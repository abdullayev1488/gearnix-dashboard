import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { useParams, useNavigate } from "react-router";

export default function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock data for demonstration - in a real app, you'd fetch this using the id
    const categoryData = {
        name: "Electronics",
        status: "active",
        image: ""
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to update category
        navigate("/categories");
    };

    return (
        <>
            <PageMeta
                title={`Edit Category ${id} - Gearnix Dashboard`}
                description="Edit an existing product category"
            />
            <PageBreadcrumb pageTitle="Edit Category" />
            <div className="grid grid-cols-1 gap-6">
                <ComponentCard title="Category Information">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                Category Image
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 transition">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                    <input type="file" className="hidden" />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                Category Name
                            </label>
                            <input
                                type="text"
                                defaultValue={categoryData.name}
                                placeholder="Enter category name"
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 text-gray-800 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/60"
                            />
                        </div>

                        <div>
                            <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                Status
                            </label>
                            <select
                                defaultValue={categoryData.status}
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 text-gray-800 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            >
                                <option value="active" className="dark:bg-gray-900 text-white">Active</option>
                                <option value="inactive" className="dark:bg-gray-900 text-white">Inactive</option>
                            </select>
                        </div>

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
                                className="flex w-full justify-center rounded-lg bg-brand-500 p-3 font-medium text-white transition hover:bg-opacity-90"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </>
    );
}
