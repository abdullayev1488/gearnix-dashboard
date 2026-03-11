import { useState, useEffect } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { Modal } from "@/components/ui/modal";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { MoreDotIcon } from "@/icons";
import api from "@/axios/axios";
import toast from "react-hot-toast";
import { EditModal } from "@/pages/Order/EditModal";
import { DeleteModal } from "@/pages/Order/DeleteModal";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Edit form state
    const [editFormData, setEditFormData] = useState({ orderStatus: "", paymentStatus: "" });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get("/order");
            if (data.success) {
                setOrders(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter((order) => {
        const q = search.toLowerCase();
        return (
            order.orderNumber.toLowerCase().includes(q) ||
            order.customer.name.toLowerCase().includes(q) ||
            order.customer.email.toLowerCase().includes(q)
        );
    });

    const handleDropdownToggle = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const closeModals = () => {
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedOrder(null);
    };

    const openEditModal = (order) => {
        setSelectedOrder(order);
        setEditFormData({
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus,
        });
        setIsEditModalOpen(true);
        setActiveDropdown(null);
    };

    const handleStatusUpdate = async () => {
        if (!selectedOrder) return;
        setActionLoading(true);
        try {
            const { data } = await api.patch(`/order/${selectedOrder._id}/status`, {
                orderStatus: editFormData.orderStatus,
                paymentStatus: editFormData.paymentStatus,
            });
            if (data.success) {
                toast.success("Order updated successfully");
                setOrders((prev) =>
                    prev.map((o) =>
                        o._id === selectedOrder._id
                            ? { ...o, orderStatus: editFormData.orderStatus, paymentStatus: editFormData.paymentStatus }
                            : o
                    )
                );
            }
        } catch (error) {
            toast.error("Failed to update order");
        } finally {
            setActionLoading(false);
            closeModals();
        }
    };

    const handleDelete = async () => {
        if (!selectedOrder) return;
        setActionLoading(true);
        try {
            const { data } = await api.delete(`/order/${selectedOrder._id}`);
            if (data.success) {
                toast.success("Order deleted successfully");
                setOrders((prev) => prev.filter((o) => o._id !== selectedOrder._id));
            }
        } catch (error) {
            toast.error("Failed to delete order");
        } finally {
            setActionLoading(false);
            closeModals();
        }
    };

    const getStatusBadge = (status) => {
        const map = { processing: "info", shipped: "warning", delivered: "success", cancelled: "error" };
        return map[status] || "warning";
    };

    const getPaymentBadge = (status) => {
        const map = { pending: "warning", paid: "success", failed: "error" };
        return map[status] || "warning";
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const dropdownItemStyles = "dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white";

    return (
        <>
            <PageMeta
                title="Orders - Gearnix Dashboard"
                description="View and manage all customer orders"
            />
            <PageBreadcrumb pageTitle="Orders" />

            {/* Search */}
            <div className="mb-6">
                <div className="relative w-full max-w-[300px]">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by order ID, customer, email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-11 pr-4 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/60"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="flex items-center justify-center py-20 text-gray-400">
                            {search ? "No orders match your search" : "No orders found"}
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Order ID
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Customer
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Date
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Total
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Status
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Payment
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {filteredOrders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell className="px-5 py-4 text-start font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            #{order.orderNumber}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white/90">{order.customer.name}</p>
                                                <p className="text-xs text-gray-400">{order.customer.email}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                                            {formatDate(order.createdAt)}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-800 font-medium text-theme-sm dark:text-white/90">
                                            ${order.totalAmount.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-theme-sm">
                                            <Badge size="sm" color={getStatusBadge(order.orderStatus)}>
                                                {capitalize(order.orderStatus)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-theme-sm">
                                            <Badge size="sm" color={getPaymentBadge(order.paymentStatus)}>
                                                {capitalize(order.paymentStatus)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-end">
                                            <div className="relative inline-block text-left">
                                                <button
                                                    onClick={() => handleDropdownToggle(order._id)}
                                                    className="dropdown-toggle text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                >
                                                    <MoreDotIcon className="size-6" />
                                                </button>
                                                <Dropdown
                                                    isOpen={activeDropdown === order._id}
                                                    onClose={() => setActiveDropdown(null)}
                                                    className="w-40"
                                                >
                                                    <DropdownItem
                                                        className={dropdownItemStyles}
                                                        onClick={() => openEditModal(order)}
                                                    >
                                                        Edit Status
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className="text-error-500 hover:text-white dark:hover:bg-error-500/10"
                                                        onClick={() => {
                                                            setSelectedOrder(order);
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
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={closeModals} className="max-w-[500px] p-6">
                <EditModal
                    selectedOrder={selectedOrder}
                    closeModals={closeModals}
                    handleStatusUpdate={handleStatusUpdate}
                    actionLoading={actionLoading}
                    editFormData={editFormData}
                    setEditFormData={setEditFormData}
                />
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={closeModals} className="max-w-[400px] p-6 text-center">
                <DeleteModal
                    selectedOrder={selectedOrder}
                    closeModals={closeModals}
                    handleDelete={handleDelete}
                    actionLoading={actionLoading}
                />
            </Modal>
        </>
    );
}
