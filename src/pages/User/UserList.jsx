import { useEffect, useState } from "react";
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
import api from "@/axios/axios";
import toast from "react-hot-toast";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        try {
            const { data } = await api.get("/auth");
            setUsers(data.data || []);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleStatus = async (id) => {
        try {
            const { data } = await api.patch(`/auth/${id}/status`);
            if (data.success) {
                setUsers((prev) =>
                    prev.map((u) =>
                        u._id === id ? { ...u, status: data.data.status } : u
                    )
                );
                toast.success(data.message);
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const filteredUsers = users
        .filter((user) => user.role !== "admin")
        .filter(
            (user) =>
                user.username.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <>
            <PageMeta
                title="Users List - Gearnix Dashboard"
                description="View all registered users"
            />
            <PageBreadcrumb pageTitle="Users List" />

            {/* Search */}
            <div className="mb-5">
                <input
                    type="text"
                    placeholder="Search by username or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-brand-500 dark:bg-white/[0.03] dark:border-white/[0.05] dark:text-white/90 dark:placeholder:text-gray-500 transition-colors"
                />
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto custom-scrollbar">
                    {loading ? (
                        <div className="flex items-center justify-center py-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-500"></div>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="flex items-center justify-center py-10 text-gray-500 dark:text-gray-400">
                            {search ? "No users match your search." : "No users found."}
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        #
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Username
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Email
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Status
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Registered
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {filteredUsers.map((user, index) => (
                                    <TableRow key={user._id}>
                                        <TableCell className="px-5 py-4 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {user.username}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                                            {user.email}
                                        </TableCell>

                                        <TableCell className="px-5 py-4 text-start text-theme-sm">
                                            <Badge
                                                size="sm"
                                                color={user.status ? "success" : "error"}
                                            >
                                                {user.status ? "Active" : "Deactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 text-start">
                                            <button
                                                onClick={() => handleToggleStatus(user._id)}
                                                className={`font-medium text-theme-sm cursor-pointer transition-colors rounded-lg border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] px-2 py-1 ${user.status
                                                    ? "text-error-500 hover:text-error-600"
                                                    : "text-success-500 hover:text-success-600"
                                                    }`}
                                            >
                                                {user.status ? "Deactivate" : "Activate"}
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </>
    );
}
