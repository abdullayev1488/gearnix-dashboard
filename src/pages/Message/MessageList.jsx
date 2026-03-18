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
import { Modal } from "@/components/ui/modal";
import { MessageViewModal } from "@/components/message/MessageViewModal";
import api from "@/axios/axios";
import toast from "react-hot-toast";

export default function MessageList() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data } = await api.get("/contact");
            if (data.success) {
                setMessages(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredMessages = messages.filter((msg) => {
        const q = search.toLowerCase();
        return (
            msg.name.toLowerCase().includes(q) ||
            msg.email.toLowerCase().includes(q) ||
            msg.subject.toLowerCase().includes(q) ||
            msg.message.toLowerCase().includes(q)
        );
    });


    const handleDelete = async () => {
        if (!selectedMessage) return;
        setActionLoading(true);
        try {
            const { data } = await api.delete(`/contact/${selectedMessage._id}`);
            if (data.success) {
                toast.success("Message deleted successfully");
                setMessages((prev) => prev.filter((m) => m._id !== selectedMessage._id));
            }
        } catch (error) {
            toast.error("Failed to delete message");
        } finally {
            setActionLoading(false);
            setIsDeleteModalOpen(false);
            setSelectedMessage(null);
        }
    };

    const handleViewMessage = (msg) => {
        setSelectedMessage(msg);
        setIsViewModalOpen(true);
    };

    const handleCloseViewModal = async () => {
        if (selectedMessage && !selectedMessage.isRead) {
            try {
                const { data } = await api.patch(`/contact/${selectedMessage._id}/read`);
                if (data.success) {
                    setMessages((prev) =>
                        prev.map((m) =>
                            m._id === selectedMessage._id ? { ...m, isRead: true } : m
                        )
                    );
                }
            } catch (error) {
            }
        }
        setIsViewModalOpen(false);
        setSelectedMessage(null);
    };

    const formatDateTime = (dateStr) => {
        const date = new Date(dateStr);
        return {
            date: date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }),
            time: date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
    };

    const unreadCount = messages.filter((m) => !m.isRead).length;

    return (
        <>
            <PageMeta
                title="Messages - Gearnix Dashboard"
                description="View and manage customer messages"
            />
            <PageBreadcrumb pageTitle="Messages" />

            {/* Stats */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total: <strong className="text-gray-800 dark:text-white">{messages.length}</strong></span>
                    {unreadCount > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            {unreadCount} unread
                        </span>
                    )}
                </div>
            </div>

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
                        placeholder="Search messages..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-11 pr-4 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/60"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto custom-scrollbar">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
                        </div>
                    ) : filteredMessages.length === 0 ? (
                        <div className="flex items-center justify-center py-20 text-gray-400">
                            {search ? "No messages match your search" : "No messages yet"}
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Status
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Customer
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Subject
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Message
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Date & Time
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {filteredMessages.map((msg) => {
                                    const { date, time } = formatDateTime(msg.createdAt);
                                    return (
                                        <TableRow
                                            key={msg._id}
                                            className={`cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.02] ${!msg.isRead ? "bg-blue-50/40 dark:bg-blue-500/[0.03]" : ""}`}
                                            onClick={() => handleViewMessage(msg)}
                                        >
                                            {/* Read/Unread Status */}
                                            <TableCell className="px-5 py-4 text-start">
                                                <span
                                                    className={`inline-block w-3 h-3 rounded-full transition-colors ${msg.isRead
                                                            ? "bg-gray-300"
                                                            : "bg-blue-500 animate-pulse"
                                                        }`}
                                                />
                                            </TableCell>

                                            {/* Customer */}
                                            <TableCell className="px-5 py-4 text-start">
                                                <div>
                                                    <p className={`text-theme-sm ${!msg.isRead ? "font-semibold text-gray-900 dark:text-white" : "font-medium text-gray-800 dark:text-white/90"}`}>
                                                        {msg.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400">{msg.email}</p>
                                                </div>
                                            </TableCell>

                                            {/* Subject */}
                                            <TableCell className="px-5 py-4 text-start">
                                                <p className={`text-theme-sm ${!msg.isRead ? "font-semibold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                                                    {msg.subject}
                                                </p>
                                            </TableCell>

                                            {/* Message Preview */}
                                            <TableCell className="px-5 py-4 text-start max-w-[250px]">
                                                <p className="text-theme-sm text-gray-500 dark:text-gray-400 truncate">
                                                    {msg.message}
                                                </p>
                                            </TableCell>

                                            {/* Date & Time */}
                                            <TableCell className="px-5 py-4 text-start whitespace-nowrap">
                                                <p className="text-theme-sm text-gray-600 dark:text-gray-400">{date}</p>
                                                <p className="text-xs text-gray-400">{time}</p>
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell className="px-5 py-4 text-end">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedMessage(msg);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                                                    title="Delete message"
                                                >
                                                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                        <line x1="10" y1="11" x2="10" y2="17" />
                                                        <line x1="14" y1="11" x2="14" y2="17" />
                                                    </svg>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            {/* View Message Modal */}
            <MessageViewModal
                isOpen={isViewModalOpen}
                onClose={handleCloseViewModal}
                message={selectedMessage}
                onDelete={() => {
                    setIsViewModalOpen(false);
                    setIsDeleteModalOpen(true);
                }}
            />

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setSelectedMessage(null); }} className="max-w-[400px] p-6 text-center">
                <div>
                    <div className="mx-auto w-14 h-14 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
                        <svg className="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Message</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Are you sure you want to delete this message from <strong>{selectedMessage?.name}</strong>? This action cannot be undone.
                    </p>
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={() => { setIsDeleteModalOpen(false); setSelectedMessage(null); }}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={actionLoading}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-60 transition-colors"
                        >
                            {actionLoading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
