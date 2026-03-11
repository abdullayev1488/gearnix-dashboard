export const DeleteModal = ({
    selectedOrder,
    closeModals,
    handleDelete,
    actionLoading
}) => {
    return (
        <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-50 text-error-500 dark:bg-error-500/10">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
                Confirm Deletion
            </h3>
            <p className="mb-6 text-gray-500 dark:text-gray-400 text-sm">
                Are you sure you want to delete order <span className="font-semibold">#{selectedOrder?.orderNumber}</span>? This action cannot be undone.
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
            </div></>
    )
}
