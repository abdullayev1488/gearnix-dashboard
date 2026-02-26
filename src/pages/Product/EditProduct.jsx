import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../../axios/axios";
import toast from "react-hot-toast";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [payload, setPayload] = useState({
        name: "",
        image: "",
        price: "",
        oldPrice: "",
        rating: "",
        reviews: "",
        status: "1",
        category: ""
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/category");
                setCategories(res.data.data || []);
            } catch (error) {
                toast.error("Failed to load categories");
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/product/${id}`);
                const p = res.data.data;
                setPayload({
                    name: p.name || "",
                    image: p.image || "",
                    price: p.price !== undefined ? String(p.price) : "",
                    oldPrice: p.oldPrice !== null && p.oldPrice !== undefined ? String(p.oldPrice) : "",
                    rating: p.rating !== undefined ? String(p.rating) : "",
                    reviews: p.reviews !== undefined ? String(p.reviews) : "",
                    status: p.status ? "1" : "0",
                    category: p.category?._id || p.category || ""
                });
            } catch (error) {
                toast.error("Failed to load product data");
                navigate("/products");
            } finally {
                setFetching(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handlePayload = (e, key) => {
        setPayload(prev => ({ ...prev, [key]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!payload.name.trim()) {
            toast.error("Product name is required");
            return;
        }
        if (!payload.image.trim()) {
            toast.error("Product image URL is required");
            return;
        }
        if (!payload.price || Number(payload.price) < 0) {
            toast.error("Valid product price is required");
            return;
        }

        setLoading(true);
        try {
            const res = await api.put(`/product/${id}`, {
                name: payload.name,
                image: payload.image,
                price: Number(payload.price),
                oldPrice: payload.oldPrice ? Number(payload.oldPrice) : null,
                rating: payload.rating ? Number(payload.rating) : 0,
                reviews: payload.reviews ? Number(payload.reviews) : 0,
                status: payload.status === "1",
                category: payload.category
            });

            if (res.data.success) {
                toast.success(res.data.message || "Product updated successfully!");
                navigate("/products");
            }
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to update product";
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

    const inputClass = "w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 text-gray-800 outline-none transition focus:border-brand-500 active:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/60";
    const labelClass = "mb-2.5 block font-medium text-gray-800 dark:text-white/90";

    return (
        <>
            <PageMeta
                title="Edit Product - Gearnix Dashboard"
                description="Edit an existing product"
            />
            <PageBreadcrumb pageTitle="Edit Product" />
            <div className="grid grid-cols-1 gap-6">
                <ComponentCard title="Product Information">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Product Name */}
                        <div>
                            <label className={labelClass}>Product Name</label>
                            <input
                                value={payload.name}
                                onChange={(e) => handlePayload(e, "name")}
                                type="text"
                                placeholder="Enter product name"
                                className={inputClass}
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className={labelClass}>Image URL</label>
                            <input
                                value={payload.image}
                                onChange={(e) => handlePayload(e, "image")}
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                className={inputClass}
                            />
                            {payload.image && (
                                <div className="mt-3 h-40 w-40 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                                    <img src={payload.image} alt="Preview" className="h-full w-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                </div>
                            )}
                        </div>

                        {/* Price & Old Price */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={labelClass}>Price</label>
                                <input
                                    value={payload.price}
                                    onChange={(e) => handlePayload(e, "price")}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Old Price (optional)</label>
                                <input
                                    value={payload.oldPrice}
                                    onChange={(e) => handlePayload(e, "oldPrice")}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Rating & Reviews */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={labelClass}>Rating (0-5)</label>
                                <input
                                    value={payload.rating}
                                    onChange={(e) => handlePayload(e, "rating")}
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    placeholder="0"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Reviews Count</label>
                                <input
                                    value={payload.reviews}
                                    onChange={(e) => handlePayload(e, "reviews")}
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Category & Status */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={labelClass}>Category</label>
                                <select
                                    value={payload.category}
                                    onChange={(e) => handlePayload(e, "category")}
                                    className={inputClass}
                                >
                                    <option value="" className="dark:bg-gray-900 text-white">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id} className="dark:bg-gray-900 text-white">
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Status</label>
                                <select
                                    value={payload.status}
                                    onChange={(e) => handlePayload(e, "status")}
                                    className={inputClass}
                                >
                                    <option value="1" className="dark:bg-gray-900 text-white">Active</option>
                                    <option value="0" className="dark:bg-gray-900 text-white">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/products")}
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
