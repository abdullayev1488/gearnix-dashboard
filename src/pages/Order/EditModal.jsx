export const EditModal = (
  { selectedOrder,
    closeModals,
    handleStatusUpdate,
    actionLoading,
    editFormData,
    setEditFormData }) => {
  return (
    <>
      <h3 className="mb-6 text-xl font-bold text-gray-800 dark:text-white/90 text-center">
        Edit Order #{selectedOrder?.orderNumber}
      </h3>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleStatusUpdate(); }}>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Order Status
          </label>
          <select
            value={editFormData.orderStatus}
            onChange={(e) => setEditFormData(prev => ({ ...prev, orderStatus: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="processing" className="dark:bg-gray-900 text-white">Processing</option>
            <option value="shipped" className="dark:bg-gray-900 text-white">Shipped</option>
            <option value="delivered" className="dark:bg-gray-900 text-white">Delivered</option>
            <option value="cancelled" className="dark:bg-gray-900 text-white">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Payment Status
          </label>
          <select
            value={editFormData.paymentStatus}
            onChange={(e) => setEditFormData(prev => ({ ...prev, paymentStatus: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="pending" className="dark:bg-gray-900 text-white">Pending</option>
            <option value="paid" className="dark:bg-gray-900 text-white">Paid</option>
            <option value="failed" className="dark:bg-gray-900 text-white">Failed</option>
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
    </>
  )
}
