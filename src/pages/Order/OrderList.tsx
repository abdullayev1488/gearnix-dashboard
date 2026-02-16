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

interface Order {
    id: string;
    customer: string;
    date: string;
    total: string;
    status: string;
    payment: string;
}

const orderData: Order[] = [
    {
        id: "#ORD-7234",
        customer: "John Doe",
        date: "2026-02-15",
        total: "$1,250.00",
        status: "Delivered",
        payment: "Paid",
    },
    {
        id: "#ORD-7235",
        customer: "Jane Smith",
        date: "2026-02-15",
        total: "$450.00",
        status: "Processing",
        payment: "Paid",
    },
    {
        id: "#ORD-7236",
        customer: "Robert Brown",
        date: "2026-02-14",
        total: "$890.00",
        status: "Pending",
        payment: "Unpaid",
    },
    {
        id: "#ORD-7237",
        customer: "Emily Davis",
        date: "2026-02-14",
        total: "$2,100.00",
        status: "Cancelled",
        payment: "Refunded",
    },
];

export default function OrderList() {
    return (
        <>
            <PageMeta
                title="Orders List - Gearnix Dashboard"
                description="View and manage all customer orders"
            />
            <PageBreadcrumb pageTitle="Orders List" />
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
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
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {orderData.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="px-5 py-4 text-start font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                        {order.id}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                                        {order.customer}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                                        {order.date}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-gray-800 font-medium text-theme-sm dark:text-white/90">
                                        {order.total}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start text-theme-sm">
                                        <Badge
                                            size="sm"
                                            color={
                                                order.status === "Delivered"
                                                    ? "success"
                                                    : order.status === "Processing"
                                                        ? "info"
                                                        : order.status === "Cancelled"
                                                            ? "error"
                                                            : "warning"
                                            }
                                        >
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        <button className="text-brand-500 hover:text-brand-600 font-medium text-theme-sm mr-4">
                                            View
                                        </button>
                                        <button className="text-gray-500 hover:text-gray-700 font-medium text-theme-sm">
                                            Invoice
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
