import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { Modal } from "../../components/ui/modal";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import api from "../../axios/axios";
import toast from "react-hot-toast";

export default function ProductList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // Modal states
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Status modal form state
    const [statusFormData, setStatusFormData] = useState({ name: "", status: "1", price: "" });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get("/product");
            setProducts(res.data.data || []);
        } catch (error) {
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async () => {
        if (!selectedProduct) return;
        setActionLoading(true);
        try {
            const res = await api.delete(`/product/${selectedProduct._id}`);
            if (res.data.success) {
                toast.success(res.data.message || "Product deleted successfully");
                fetchProducts();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete product");
        } finally {
            setActionLoading(false);
            closeModals();
        }
    };

    const handleStatusUpdate = async () => {
        if (!selectedProduct) return;
        setActionLoading(true);
        try {
            const res = await api.put(`/product/${selectedProduct._id}`, {
                name: statusFormData.name,
                status: statusFormData.status === "1",
                price: Number(statusFormData.price)
            });
            if (res.data.success) {
                toast.success(res.data.message || "Product updated successfully");
                fetchProducts();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update product");
        } finally {
            setActionLoading(false);
            closeModals();
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().startsWith(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ? true :
                statusFilter === "active" ? product.status :
                    !product.status;
        return matchesSearch && matchesStatus;
    });

    const handleDropdownToggle = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const closeModals = () => {
        setIsViewModalOpen(false);
        setIsStatusModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
    };

    const openStatusModal = (product) => {
        setSelectedProduct(product);
        setStatusFormData({
            name: product.name,
            status: product.status ? "1" : "0",
            price: String(product.price)
        });
        setIsStatusModalOpen(true);
        setActiveDropdown(null);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(price);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="text-yellow-400">★</span>);
            } else if (i === fullStars && hasHalf) {
                stars.push(<span key={i} className="text-yellow-400">★</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300 dark:text-gray-600">★</span>);
            }
        }
        return stars;
    };

    const dropdownItemStyles = "dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white";

    return (
        <>
            <PageMeta
                title="Products List - Gearnix Dashboard"
                description="View and manage all products"
            />
            <PageBreadcrumb pageTitle="Products List" />

            {/* Top Controls */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-[300px]">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-11 pr-4 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/60"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-400 text-nowrap">Filter Status:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-500"></div>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Image
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Product Name
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Price
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Rating
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Status
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell className="px-5 py-4 text-start">
                                                <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                                                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                                                        {product.image ? (
                                                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                                        ) : (
                                                            "📦"
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-5 py-4 text-start font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {product.name}
                                            </TableCell>
                                            <TableCell className="px-5 py-4 text-start text-theme-sm">
                                                <div>
                                                    <span className="font-semibold text-gray-800 dark:text-white/90">{formatPrice(product.price)}</span>
                                                    {product.oldPrice && (
                                                        <span className="ml-2 text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-5 py-4 text-start text-theme-sm">
                                                <div className="flex items-center gap-1">
                                                    {renderStars(product.rating)}
                                                    <span className="ml-1 text-xs text-gray-400">({product.reviews})</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-5 py-4 text-start text-theme-sm">
                                                <Badge
                                                    size="sm"
                                                    color={product.status ? "success" : "warning"}
                                                >
                                                    {product.status ? "Active" : "Inactive"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="px-5 py-4 text-end">
                                                <div className="relative inline-block text-left">
                                                    <button
                                                        onClick={() => handleDropdownToggle(product._id)}
                                                        className="dropdown-toggle text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                    >
                                                        <MoreDotIcon className="size-6" />
                                                    </button>
                                                    <Dropdown
                                                        isOpen={activeDropdown === product._id}
                                                        onClose={() => setActiveDropdown(null)}
                                                        className="w-40"
                                                    >
                                                        <DropdownItem
                                                            className={dropdownItemStyles}
                                                            onClick={() => {
                                                                setSelectedProduct(product);
                                                                setIsViewModalOpen(true);
                                                                setActiveDropdown(null);
                                                            }}
                                                        >
                                                            View Details
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            className={dropdownItemStyles}
                                                            onClick={() => openStatusModal(product)}
                                                        >
                                                            Quick Edit
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            className={dropdownItemStyles}
                                                            onClick={() => {
                                                                navigate(`/edit-product/${product._id}`);
                                                                setActiveDropdown(null);
                                                            }}
                                                        >
                                                            Edit
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            className="text-error-500 hover:text-error-600 dark:hover:bg-error-500/10"
                                                            onClick={() => {
                                                                setSelectedProduct(product);
                                                                setIsDeleteModalOpen(true);
                                                                setActiveDropdown(null);
                                                            }}
                                                        >
                                                            Delete
                                                        </DropdownItem>
                                                    </Dropdown>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="px-5 py-10 text-center text-gray-500 dark:text-gray-400">
                                            No products found matching your criteria.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            {/* View Modal */}
            <Modal isOpen={isViewModalOpen} onClose={closeModals} className="max-w-[500px] p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 h-24 w-24 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                        <div className="flex h-full w-full items-center justify-center text-4xl text-gray-400">
                            {selectedProduct?.image ? (
                                <img src={selectedProduct.image} alt="" className="h-full w-full object-cover" />
                            ) : "📦"}
                        </div>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
                        {selectedProduct?.name}
                    </h3>
                    <p className="mb-4 text-gray-500 dark:text-gray-400">
                        Product ID: #{selectedProduct?._id?.slice(0, 8)}...
                    </p>
                    <div className="w-full border-t border-gray-100 py-4 dark:border-gray-800">
                        <div className="grid grid-cols-2 gap-4 text-start">
                            <div>
                                <span className="block text-xs font-medium uppercase text-gray-400">Price</span>
                                <span className="font-semibold text-gray-800 dark:text-white/90">
                                    {selectedProduct && formatPrice(selectedProduct.price)}
                                </span>
                                {selectedProduct?.oldPrice && (
                                    <span className="ml-2 text-xs text-gray-400 line-through">
                                        {formatPrice(selectedProduct.oldPrice)}
                                    </span>
                                )}
                            </div>
                            <div>
                                <span className="block text-xs font-medium uppercase text-gray-400">Status</span>
                                <Badge
                                    size="sm"
                                    color={selectedProduct?.status ? "success" : "warning"}
                                >
                                    {selectedProduct?.status ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                            <div>
                                <span className="block text-xs font-medium uppercase text-gray-400">Rating</span>
                                <div className="flex items-center gap-1">
                                    {selectedProduct && renderStars(selectedProduct.rating)}
                                    <span className="ml-1 text-xs text-gray-400">({selectedProduct?.reviews})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={closeModals}
                        className="w-full rounded-lg bg-brand-500 p-3 font-medium text-white transition hover:bg-opacity-90"
                    >
                        Close
                    </button>
                </div>
            </Modal>

            {/* Quick Edit / Status Modal */}
            <Modal isOpen={isStatusModalOpen} onClose={closeModals} className="max-w-[500px] p-6">
                <h3 className="mb-6 text-xl font-bold text-gray-800 dark:text-white/90 text-center">
                    Quick Update Product
                </h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleStatusUpdate(); }}>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={statusFormData.name}
                            onChange={(e) => setStatusFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/60"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Price
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={statusFormData.price}
                            onChange={(e) => setStatusFormData(prev => ({ ...prev, price: e.target.value }))}
                            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/60"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Status
                        </label>
                        <select
                            value={statusFormData.status}
                            onChange={(e) => setStatusFormData(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        >
                            <option value="1" className="dark:bg-gray-900 text-white">Active</option>
                            <option value="0" className="dark:bg-gray-900 text-white">Inactive</option>
                        </select>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <button
                            type="button"
                            onClick={closeModals}
                            className="flex w-full justify-center rounded-lg border border-gray-300 p-3 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white/90 dark:hover:bg-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={actionLoading}
                            className="flex w-full justify-center items-center gap-2 rounded-lg bg-brand-500 p-3 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {actionLoading && (
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            )}
                            {actionLoading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={closeModals} className="max-w-[400px] p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-50 text-error-500 dark:bg-error-500/10">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
                    Confirm Deletion
                </h3>
                <p className="mb-6 text-gray-500 dark:text-gray-400 text-sm">
                    Are you sure you want to delete the product <span className="font-semibold">"{selectedProduct?.name}"</span>? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={closeModals}
                        className="flex w-full justify-center rounded-lg border border-gray-300 p-3 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white/90 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={actionLoading}
                        className="flex w-full justify-center items-center gap-2 rounded-lg bg-error-500 p-3 font-medium text-white transition hover:bg-error-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {actionLoading && (
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        {actionLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </Modal>
        </>
    );
}
