import { Modal } from "@/components/ui/modal";
import Badge from "@/components/ui/badge/Badge";

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

export const OrderViewModal = ({ isOpen, onClose, order }) => {
    if (!order) return null;

    const { date, time } = formatDateTime(order.createdAt);

    const getStatusBadge = (status) => {
        const map = { processing: "info", shipped: "warning", delivered: "success", cancelled: "error" };
        return map[status] || "warning";
    };

    const getPaymentBadge = (status) => {
        const map = { pending: "warning", paid: "success", failed: "error" };
        return map[status] || "warning";
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-0 flex flex-col max-h-[80vh]">
            <div className="px-6 pt-10 pb-5 sticky top-0 bg-white dark:bg-[#121c2c] z-20 rounded-t-3xl border-b border-gray-100 dark:border-white/[0.05]">
                <div className="flex items-center justify-between pr-10 sm:pr-20">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order Details</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Order #{order.orderNumber}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 text-right">
                        <Badge size="sm" color={getStatusBadge(order.orderStatus)}>
                            {order.orderStatus.toUpperCase()}
                        </Badge>
                        <p className="text-[10px] text-gray-400 font-medium">{date} at {time}</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[60vh] custom-scrollbar p-6 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Customer Information</h4>
                        <div className="space-y-2">
                            <div className="flex gap-2 text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[80px]">Name:</span>
                                <span className="text-gray-800 dark:text-white/90">{order.customer.name}</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[80px]">Email:</span>
                                <span className="text-gray-800 dark:text-white/90">{order.customer.email}</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[80px]">Phone:</span>
                                <span className="text-gray-800 dark:text-white/90">{order.customer.phone}</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium min-w-[80px]">Address:</span>
                                <span className="text-gray-800 dark:text-white/90">{order.customer.address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Order Summary</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Payment Method:</span>
                                <span className="text-gray-800 dark:text-white/90 uppercase">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Payment Status:</span>
                                <Badge size="sm" color={getPaymentBadge(order.paymentStatus)}>
                                    {order.paymentStatus.toUpperCase()}
                                </Badge>
                            </div>
                            <div className="pt-2 mt-2 border-t border-gray-100 dark:border-white/[0.05] flex justify-between">
                                <span className="text-base font-bold text-gray-900 dark:text-white">Total Amount:</span>
                                <span className="text-base font-bold text-brand-500">${order.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Products ({order.items.length})</h4>
                    <div className="border border-gray-100 dark:border-white/[0.05] rounded-xl overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/[0.05]">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Product</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center">Price</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center">Qty</th>
                                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {order.items.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-white/[0.03] p-1 flex items-center justify-center shrink-0">
                                                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain text-[10px]" />
                                                </div>
                                                <span className="font-medium text-gray-800 dark:text-white/90 line-clamp-2">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{item.quantity}</td>
                                        <td className="px-4 py-3 text-right font-medium text-gray-800 dark:text-white/90">${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="p-5 sticky bottom-0 bg-white dark:bg-[#121c2c] border-t border-gray-100 dark:border-white/[0.05] rounded-b-3xl flex justify-end z-20">
                <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-lg text-sm font-bold text-gray-700 border border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 transition-all active:scale-95"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};
