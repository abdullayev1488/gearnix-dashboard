import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

export default function AddOrder() {
    return (
        <>
            <PageMeta
                title="New Order - Gearnix Dashboard"
                description="Create a new customer order"
            />
            <PageBreadcrumb pageTitle="New Order" />
            <div className="grid grid-cols-1 gap-6">
                <ComponentCard title="Order Details">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter customer name"
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                                />
                            </div>
                            <div>
                                <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                    Customer Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter customer email"
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                Shipping Address
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Enter shipping address"
                                className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                    Order Status
                                </label>
                                <select className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                                    <option value="pending" className="dark:bg-gray-800 text-white">Pending</option>
                                    <option value="processing" className="dark:bg-gray-800 text-white">Processing</option>
                                    <option value="delivered" className="dark:bg-gray-800 text-white">Delivered</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                    Payment Method
                                </label>
                                <select className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                                    <option value="credit_card" className="dark:bg-gray-800 text-white">Credit Card</option>
                                    <option value="paypal" className="dark:bg-gray-800 text-white">PayPal</option>
                                    <option value="cash" className="dark:bg-gray-800 text-white">Cash on Delivery</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2.5 block font-medium text-gray-800 dark:text-white/90">
                                    Total Amount
                                </label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-brand-500 active:border-brand-500 disabled:cursor-default dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white/60"
                                />
                            </div>
                        </div>

                        <button className="flex w-full justify-center rounded-lg bg-brand-500 p-3 font-medium text-white transition hover:bg-opacity-90">
                            Create Order
                        </button>
                    </form>
                </ComponentCard>
            </div>
        </>
    );
}
