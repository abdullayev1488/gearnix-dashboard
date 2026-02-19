import { useState } from "react";
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
import { MoreDotIcon, TrashBinIcon } from "../../icons";


const productData = [
    {
        id: 1,
        name: "Apple iPhone 14 Pro",
        category: "Electronics",
        brand: "Apple",
        price: "$999.00",
        numericPrice: 999.00,
        stock: 25,
        status: "In Stock",
        image: "/images/product/product-01.png",
        rate: 4.8,
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        category: "Electronics",
        brand: "Samsung",
        price: "$1,199.00",
        numericPrice: 1199.00,
        stock: 15,
        status: "In Stock",
        image: "/images/product/product-02.png",
        rate: 4.9,
    },
    {
        id: 3,
        name: "Nike Air Max 270",
        category: "Fashion",
        brand: "Nike",
        price: "$150.00",
        numericPrice: 150.00,
        stock: 50,
        status: "In Stock",
        image: "/images/product/product-03.png",
        rate: 4.7,
    },
    {
        id: 4,
        name: "Sony PlayStation 5",
        category: "Electronics",
        brand: "Sony",
        price: "$499.00",
        numericPrice: 499.00,
        stock: 0,
        status: "Out of Stock",
        image: "/images/product/product-04.png",
        rate: 4.9,
    },
];

export default function ProductList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [brandFilter, setBrandFilter] = useState("all");
    const [priceFilter, setPriceFilter] = useState("all");

    // Modal states
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const filteredProducts = productData.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || product.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
        const matchesBrand = brandFilter === "all" || product.brand === brandFilter;

        let matchesPrice = true;
        if (priceFilter === "low") matchesPrice = product.numericPrice < 500;
        if (priceFilter === "medium") matchesPrice = product.numericPrice >= 500 && product.numericPrice <= 1000;
        if (priceFilter === "high") matchesPrice = product.numericPrice > 1000;

        return matchesSearch && matchesStatus && matchesCategory && matchesBrand && matchesPrice;
    });

    const handleDropdownToggle = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };


    const handleView = (product) => {
        setSelectedProduct(product);
        setIsViewModalOpen(true);
    };

    const handleChangeStatus = (product) => {
        setSelectedProduct(product);
        setIsStatusModalOpen(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const dropdownItemStyles = "dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white";

    return (
        <>
            <PageMeta
                title="Products List - Gearnix Dashboard"
                description="View and manage all products"
            />
            <PageBreadcrumb pageTitle="Products List" />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg className="fill-current" width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.16667 3.33335C5.94501 3.33335 3.33334 5.94502 3.33334 9.16668C3.33334 12.3883 5.94501 15 9.16667 15C12.3883 15 15 12.3883 15 9.16668C15 5.94502 12.3883 3.33335 9.16667 3.33335ZM1.66667 9.16668C1.66667 5.02454 5.02454 1.66668 9.16667 1.66668C13.3088 1.66668 16.6667 5.02454 16.6667 9.16668C16.6667 13.3088 13.3088 16.6667 9.16667 16.6667C5.02454 16.6667 1.66667 13.3088 1.66667 9.16668Z" fill="" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.2857 13.2858C13.6111 12.9603 14.1388 12.9603 14.4642 13.2858L18.0892 16.9108C18.4147 17.2362 18.4147 17.7639 18.0892 18.0893C17.7638 18.4147 17.2361 18.4147 16.9107 18.0893L13.2857 14.4643C12.9603 14.1388 12.9603 13.6112 13.2857 13.2858Z" fill="" />
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

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    >
                        <option value="all">All Status</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>

                    {/* Category Filter */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    >
                        <option value="all">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                    </select>

                    {/* Brand Filter */}
                    <select
                        value={brandFilter}
                        onChange={(e) => setBrandFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    >
                        <option value="all">All Brands</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Nike">Nike</option>
                        <option value="Sony">Sony</option>
                    </select>

                    {/* Price Filter */}
                    <select
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    >
                        <option value="all">All Prices</option>
                        <option value="low">Under $500</option>
                        <option value="medium">$500 - $1000</option>
                        <option value="high">Over $1000</option>
                    </select>
                </div>

                <button
                    onClick={() => navigate("/new-product")}
                    className="flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 font-medium text-white transition hover:bg-opacity-90"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4.16666V15.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.16666 10H15.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    New Product
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Product
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Category/Brand
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Price
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Stock
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Status
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="px-5 py-4 text-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                                                    📦
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                        {product.name}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-theme-xs text-orange-500">
                                                        ★ {product.rate}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                                            <div>{product.category}</div>
                                            <div className="text-theme-xs text-gray-400">{product.brand}</div>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-800 font-medium text-theme-sm dark:text-white/90">
                                            {product.price}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                                            {product.stock}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-theme-sm">
                                            <Badge
                                                size="sm"
                                                color={product.status === "In Stock" ? "success" : "error"}
                                            >
                                                {product.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-end">
                                            <div className="relative inline-block text-left">
                                                <button
                                                    onClick={() => handleDropdownToggle(product.id)}
                                                    className="dropdown-toggle text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                >
                                                    <MoreDotIcon className="size-6" />
                                                </button>
                                                <Dropdown
                                                    isOpen={activeDropdown === product.id}
                                                    onClose={() => setActiveDropdown(null)}
                                                    className="w-40"
                                                >
                                                    <DropdownItem
                                                        className={dropdownItemStyles}
                                                        onClick={() => handleView(product)}
                                                    >
                                                        View Details
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className={dropdownItemStyles}

                                                        onClick={() => handleChangeStatus(product)}

                                                    >
                                                        Change Status
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className={dropdownItemStyles}
                                                        onClick={() => navigate(`/edit-product/${product.id}`)}
                                                    >
                                                        Edit
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className="text-error-500 hover:text-error-600 dark:hover:bg-error-500/10"
                                                        onClick={() => handleDelete(product)}
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
                </div>
            </div>

            {/* View Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                className="max-w-[500px]"
            >
                <div className="relative overflow-hidden rounded-2xl bg-white p-6 dark:bg-gray-dark md:p-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 h-24 w-24 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500 text-4xl">
                            📦
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                            {selectedProduct?.name}
                        </h3>
                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                            Product ID: #{selectedProduct?.id.toString().padStart(4, '0')}
                        </p>
                        <div className="grid w-full grid-cols-2 gap-4 text-start">
                            <div className="rounded-xl border border-gray-100 p-4 dark:border-white/[0.05]">
                                <p className="text-xs text-gray-500">Price</p>
                                <p className="font-bold text-gray-800 dark:text-white">{selectedProduct?.price}</p>
                            </div>
                            <div className="rounded-xl border border-gray-100 p-4 dark:border-white/[0.05]">
                                <p className="text-xs text-gray-500">Stock</p>
                                <p className="font-bold text-gray-800 dark:text-white">{selectedProduct?.stock}</p>
                            </div>
                            <div className="rounded-xl border border-gray-100 p-4 dark:border-white/[0.05]">
                                <p className="text-xs text-gray-500">Category</p>
                                <p className="font-bold text-gray-800 dark:text-white">{selectedProduct?.category}</p>
                            </div>
                            <div className="rounded-xl border border-gray-100 p-4 dark:border-white/[0.05]">
                                <p className="text-xs text-gray-500">Brand</p>
                                <p className="font-bold text-gray-800 dark:text-white">{selectedProduct?.brand}</p>
                            </div>
                            <div className="rounded-xl border border-gray-100 p-4 dark:border-white/[0.05]">
                                <p className="text-xs text-gray-500">Rating</p>
                                <p className="font-bold text-gray-800 dark:text-white">★ {selectedProduct?.rate}</p>
                            </div>
                            <div className="rounded-xl border border-gray-100 p-4 dark:border-white/[0.05]">
                                <p className="text-xs text-gray-500">Status</p>
                                <Badge color={selectedProduct?.status === "In Stock" ? "success" : "error"}>
                                    {selectedProduct?.status}
                                </Badge>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsViewModalOpen(false)}
                            className="mt-8 w-full rounded-lg bg-brand-500 p-3 font-medium text-white transition hover:bg-opacity-90"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Quick Update Modal */}
            <Modal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                className="max-w-[500px]"
            >
                <div className="relative overflow-hidden rounded-2xl bg-white p-6 dark:bg-gray-dark md:p-10">
                    <h3 className="mb-6 text-xl font-bold text-gray-800 dark:text-white/90">
                        Quick Update Product
                    </h3>
                    <form className="space-y-4">
                        <div>
                            <label className="mb-2.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Product Name
                            </label>
                            <input
                                type="text"
                                defaultValue={selectedProduct?.name}
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="mb-2.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Product Status
                            </label>
                            <select
                                defaultValue={selectedProduct?.status}
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            >
                                <option value="In Stock" className="dark:bg-gray-900">In Stock</option>
                                <option value="Out of Stock" className="dark:bg-gray-900">Out of Stock</option>
                            </select>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsStatusModalOpen(false)}
                                className="w-full rounded-lg border border-gray-300 p-3 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white/70 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsStatusModalOpen(false)}
                                className="w-full rounded-lg bg-brand-500 p-3 font-medium text-white transition hover:bg-opacity-90"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                className="max-w-[400px]"
            >
                <div className="relative overflow-hidden rounded-2xl bg-white p-6 dark:bg-gray-dark md:p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error-100 text-error-500 dark:bg-error-500/10">
                            <TrashBinIcon className="h-8 w-8" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
                            Delete Product
                        </h3>
                        <p className="mb-8 text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete <b>{selectedProduct?.name}</b>? This action cannot be undone.
                        </p>
                        <div className="flex w-full gap-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full rounded-lg border border-gray-300 p-3 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white/70 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full rounded-lg bg-error-500 p-3 font-medium text-white transition hover:bg-error-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
