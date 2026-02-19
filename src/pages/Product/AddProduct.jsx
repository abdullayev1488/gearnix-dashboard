import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

export default function AddProduct() {
    return (
        <>
            <PageMeta
                title="New Product - Gearnix Dashboard"
                description="Create a new product"
            />
            <PageBreadcrumb pageTitle="New Product" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="space-y-6">
                    <ComponentCard title="Basic Information">
                        <form className="space-y-4">
                            <div>
                                <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                        Category
                                    </label>
                                    <select className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                                        <option value="" className="dark:bg-gray-800 text-white">Select Category</option>
                                        <option value="electronics" className="dark:bg-gray-800 text-white">Electronics</option>
                                        <option value="fashion" className="dark:bg-gray-800 text-white">Fashion</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                        Brand
                                    </label>
                                    <select className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                                        <option value="" className="dark:bg-gray-800 text-white">Select Brand</option>
                                        <option value="apple" className="dark:bg-gray-800 text-white">Apple</option>
                                        <option value="samsung" className="dark:bg-gray-800 text-white">Samsung</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                        Price
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full rounded-lg border border-gray-300 bg-transparent pl-8 pr-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                        Rate (0-5)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        placeholder="4.5"
                                        className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                                    />
                                </div>
                            </div>
                        </form>
                    </ComponentCard>

                    <ComponentCard title="Product Description">
                        <form className="space-y-4">
                            <div>
                                <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                    Short Description
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="Enter short description"
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                                ></textarea>
                            </div>

                            <div>
                                <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                    Full Description
                                </label>
                                <textarea
                                    rows={6}
                                    placeholder="Enter full product description"
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                                ></textarea>
                            </div>
                        </form>
                    </ComponentCard>
                </div>

                <div className="space-y-6">
                    <ComponentCard title="Inventory & Media">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                        Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                        Status
                                    </label>
                                    <select className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                                        <option value="active" className="dark:bg-gray-800 text-white">Active</option>
                                        <option value="inactive" className="dark:bg-gray-800 text-white">Inactive</option>
                                        <option value="draft" className="dark:bg-gray-800 text-white">Draft</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                    SKU
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter product SKU"
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                    Product Images
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        </div>
                                        <input type="file" className="hidden" multiple />
                                    </label>
                                </div>
                            </div>

                            <button className="flex w-full justify-center rounded-lg bg-brand-500 p-3 font-medium text-white transition hover:bg-opacity-90 mt-4">
                                Create Product
                            </button>
                        </form>
                    </ComponentCard>
                </div>
            </div>
        </>
    );
}
