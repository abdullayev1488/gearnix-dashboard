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

export const MessageViewModal = ({ isOpen, onClose, message, onDelete }) => {
    if (!message) return null;

    const { date, time } = formatDateTime(message.createdAt);

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[550px] p-6">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Message Details</h3>
                </div>
                <div className="space-y-3 mb-4">
                    <div className="flex gap-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[70px]">From:</span>
                        <span className="text-sm text-gray-800 dark:text-white">{message.name}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[70px]">Email:</span>
                        <span className="text-sm text-gray-800 dark:text-white">{message.email}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[70px]">Subject:</span>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">{message.subject}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[70px]">Date:</span>
                        <span className="text-sm text-gray-800 dark:text-white">
                            {date} at {time}
                        </span>
                    </div>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 max-h-[300px] overflow-y-auto">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{message.message}</p>
                </div>
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};
