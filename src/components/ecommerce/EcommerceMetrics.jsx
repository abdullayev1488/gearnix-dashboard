import { useEffect, useState } from "react";
import {
  GroupIcon,
  BoxIconLine,
  ShootingStarIcon,
} from "@/icons";
import api from "@/axios/axios";

export default function EcommerceMetrics() {
  const [metrics, setMetrics] = useState({
    users: 0,
    orders: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          api.get("/auth"),
          api.get("/order"),
          api.get("/product"),
        ]);

        setMetrics({
          users: usersRes.data?.data?.length || 0,
          orders: ordersRes.data?.data?.length || 0,
          products: productsRes.data?.data?.pagination?.total || 0,
        });
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const cards = [
    {
      icon: <GroupIcon className="size-6 text-white" />,
      label: "Customers",
      value: metrics.users,
      bgGradient: "from-blue-600 to-blue-400",
      iconBg: "bg-blue-500/20 backdrop-blur-md border border-white/20",
      chartColor: "#3b82f6",
      trend: "+12.5%",
      isPositive: true,
    },
    {
      icon: <ShootingStarIcon className="size-6 text-white" />,
      label: "Orders",
      value: metrics.orders,
      bgGradient: "from-purple-600 to-purple-400",
      iconBg: "bg-purple-500/20 backdrop-blur-md border border-white/20",
      chartColor: "#a855f7",
      trend: "+8.2%",
      isPositive: true,
    },
    {
      icon: <BoxIconLine className="size-6 text-white" />,
      label: "Products",
      value: metrics.products,
      bgGradient: "from-rose-600 to-rose-400",
      iconBg: "bg-rose-500/20 backdrop-blur-md border border-white/20",
      chartColor: "#f43f5e",
      trend: "+5.4%",
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative group overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${card.bgGradient} opacity-5 transition-transform group-hover:scale-110`} />
          <div className={`absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr ${card.bgGradient} opacity-[0.03] transition-transform group-hover:scale-110`} />

          <div className="relative flex items-start justify-between">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.bgGradient} shadow-lg shadow-blue-500/20`}>
              <div className="text-white">
                {card.icon}
              </div>
            </div>

            <div className="text-right">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${card.isPositive ? 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400' : 'bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400'}`}>
                {card.trend}
              </span>
            </div>
          </div>

          <div className="relative mt-6 flex items-end justify-between">
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {card.label}
              </span>
              <h4 className="mt-1 font-bold text-gray-800 text-3xl dark:text-white/90">
                {loading ? (
                  <span className="inline-block h-9 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                ) : (
                  card.value.toLocaleString()
                )}
              </h4>
            </div>

            <div className="w-24 h-12 mb-1">
              <svg viewBox="0 0 100 40" className="w-full h-full">
                <path
                  d="M0,35 Q10,10 20,30 T40,20 T60,35 T80,15 T100,25"
                  fill="none"
                  stroke={card.chartColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-60"
                />
                <path
                  d="M0,35 Q10,10 20,30 T40,20 T60,35 T80,15 T100,25 V40 H0 Z"
                  fill={`url(#gradient-${card.label})`}
                  className="opacity-10"
                />
                <defs>
                  <linearGradient id={`gradient-${card.label}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={card.chartColor} />
                    <stop offset="100%" stopColor={card.chartColor} stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
