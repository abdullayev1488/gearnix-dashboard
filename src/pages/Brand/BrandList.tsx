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
import { MoreDotIcon } from "../../icons";

interface Brand {
    id: number;
    name: string;
    image: string;
    website: string;
    status: string;
    productCount: number;
}

const initialBrandData: Brand[] = [
    {
        id: 1,
        name: "Apple",
        image: "/images/brand/apple.png",
        website: "https://apple.com",
        status: "Active",
        productCount: 45,
    },
    {
        id: 2,
        name: "Samsung",
        image: "/images/brand/samsung.png",
        website: "https://samsung.com",
        status: "Active",
        productCount: 62,
    },
    {
        id: 3,
        name: "Nike",
        image: "/images/brand/nike.png",
        website: "https://nike.com",
        status: "Active",
        productCount: 88,
    },
    {
        id: 4,
        name: "Adidas",
        image: "/images/brand/adidas.png",
        website: "https://adidas.com",
        status: "Active",
        productCount: 74,
    },
];

export default function BrandList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

    // Modal states
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const filteredBrands = initialBrandData.filter((brand) => {
        const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || brand.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const handleDropdownToggle = (id: number) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const closeModals = () => {
        setIsViewModalOpen(false);
        setIsStatusModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedBrand(null);
    };

    const dropdownItemStyles = "dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white";

    return (
        <>
            <PageMeta
                title="Brands List - Gearnix Dashboard"
                description="View and manage all brands"
            />
            <PageBreadcrumb pageTitle="Brands List" />

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-[300px]">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search brands..."
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
                        <option value="all" className="dark:bg-gray-900">All</option>
                        <option value="active" className="dark:bg-gray-900">Active</option>
                        <option value="inactive" className="dark:bg-gray-900">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Logo
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Brand Name
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Status
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Products
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {filteredBrands.length > 0 ? (
                                filteredBrands.map((brand) => (
                                    <TableRow key={brand.id}>
                                        <TableCell className="px-5 py-4 text-start">
                                            <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 border dark:border-gray-700">
                                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                                    🏢
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {brand.name}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-theme-sm">
                                            <Badge
                                                size="sm"
                                                color={brand.status === "Active" ? "success" : "warning"}
                                            >
                                                {brand.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                                            {brand.productCount}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-end">
                                            <div className="relative inline-block text-left">
                                                <button
                                                    onClick={() => handleDropdownToggle(brand.id)}
                                                    className="dropdown-toggle text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                >
                                                    <MoreDotIcon className="size-6" />
                                                </button>
                                                <Dropdown
                                                    isOpen={activeDropdown === brand.id}
                                                    onClose={() => setActiveDropdown(null)}
                                                    className="w-40"
                                                >
                                                    <DropdownItem
                                                        className={dropdownItemStyles}
                                                        onClick={() => {
                                                            setSelectedBrand(brand);
                                                            setIsViewModalOpen(true);
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        View Details
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className={dropdownItemStyles}
                                                        onClick={() => {
                                                            setSelectedBrand(brand);
                                                            setIsStatusModalOpen(true);
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        Change Status
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className={dropdownItemStyles}
                                                        onClick={() => {
                                                            navigate(`/edit-brand/${brand.id}`);
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        Edit
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className="text-error-500 hover:text-error-600 dark:hover:bg-error-500/10"
                                                        onClick={() => {
                                                            setSelectedBrand(brand);
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
                                    <TableCell colSpan={5} className="px-5 py-10 text-center text-gray-500 dark:text-gray-400">
                                        No brands found matching your criteria.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* View Modal */}
            <Modal isOpen={isViewModalOpen} onClose={closeModals} className="max-w-[500px] p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 h-24 w-24 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 border dark:border-gray-700">
                        <div className="flex h-full w-full items-center justify-center text-4xl text-gray-400">
                            🏢
                        </div>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
                        {selectedBrand?.name}
                    </h3>
                    <p className="mb-6 text-gray-500 dark:text-gray-400">
                        Brand ID: #{selectedBrand?.id}
                    </p>
                    <div className="grid w-full grid-cols-2 gap-4 border-t border-gray-100 py-6 dark:border-gray-800">
                        <div className="text-start">
                            <span className="block text-xs font-medium uppercase text-gray-400">Status</span>
                            <Badge
                                size="sm"
                                color={selectedBrand?.status === "Active" ? "success" : "warning"}
                            >
                                {selectedBrand?.status}
                            </Badge>
                        </div>
                        <div className="text-start">
                            <span className="block text-xs font-medium uppercase text-gray-400">Product Count</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                {selectedBrand?.productCount} Products
                            </span>
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

            {/* Status/Quick Edit Modal */}
            <Modal isOpen={isStatusModalOpen} onClose={closeModals} className="max-w-[500px] p-6">
                <h3 className="mb-6 text-xl font-bold text-gray-800 dark:text-white/90 text-center">
                    Quick Update Brand
                </h3>
                <form className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Brand Logo
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 shrink-0">
                                <div className="flex h-full w-full items-center justify-center text-2xl text-gray-400">
                                    🏢
                                </div>
                            </div>
                            <button type="button" className="text-sm font-medium text-brand-500 hover:underline">
                                Change Logo
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Brand Name
                        </label>
                        <input
                            type="text"
                            defaultValue={selectedBrand?.name}
                            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/60"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Status
                        </label>
                        <select
                            defaultValue={selectedBrand?.status.toLowerCase()}
                            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        >
                            <option value="active" className="dark:bg-gray-900 text-white">Active</option>
                            <option value="inactive" className="dark:bg-gray-900 text-white">Inactive</option>
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
                            type="button"
                            className="flex w-full justify-center rounded-lg bg-brand-500 p-3 font-medium text-white transition hover:bg-opacity-90"
                        >
                            Update
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
                    Are you sure you want to delete the brand <span className="font-semibold">"{selectedBrand?.name}"</span>? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={closeModals}
                        className="flex w-full justify-center rounded-lg border border-gray-300 p-3 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white/90 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        className="flex w-full justify-center rounded-lg bg-error-500 p-3 font-medium text-white transition hover:bg-error-600"
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </>
    );
}
