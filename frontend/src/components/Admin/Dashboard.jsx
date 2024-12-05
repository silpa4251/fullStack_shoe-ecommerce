import { useState, useEffect } from "react";
import {
  fetchTotalUsers,
  fetchTotalRevenue,
  fetchTotalProducts,
  fetchTotalOrders,
  fetchTopCustomers,
  fetchRecentOrders,
} from "../../services/dashboardService";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Parallel API calls using services
        const [
          fetchedTotalUsers,
          fetchedTotalRevenue,
          fetchedTotalProducts,
          fetchedTotalOrders,
          fetchedTopCustomers,
          fetchedRecentOrders,
        ] = await Promise.all([
          fetchTotalUsers(),
          fetchTotalRevenue(),
          fetchTotalProducts(),
          fetchTotalOrders(),
          fetchTopCustomers(),
          fetchRecentOrders(),
        ]);

        setTotalUsers(fetchedTotalUsers);
        setRevenue(fetchedTotalRevenue);
        setTotalProducts(fetchedTotalProducts);
        setTotalOrders(fetchedTotalOrders);
        setTopCustomers(fetchedTopCustomers);
        setRecentOrders(fetchedRecentOrders);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const chartData = {
    labels: ["Users", "Products", "Orders", "Revenue (K)"],
    datasets: [
      {
        label: "Statistics",
        data: [totalUsers, totalProducts, totalOrders, revenue / 1000],
        backgroundColor: ["#6366F1", "#10B981", "#F59E0B", "#EC4899"],
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[{
          label: "Total Users", value: totalUsers, gradient: "from-indigo-500 to-purple-500"
        }, {
          label: "Total Products", value: totalProducts, gradient: "from-teal-500 to-green-500"
        }, {
          label: "Total Orders", value: totalOrders, gradient: "from-yellow-400 to-orange-400"
        }, {
          label: "Total Revenue", value: `Rs.${revenue.toFixed(2)}`, gradient: "from-pink-500 to-red-500"
        }].map((card, idx) => (
          <div key={idx} className={`p-6 bg-gradient-to-r ${card.gradient} text-white shadow-lg rounded-lg`}>
            <h2 className="text-lg font-bold">{card.label}</h2>
            <p className="text-3xl mt-4">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="p-6 bg-white shadow-lg rounded-lg mt-8">
        <div className="relative w-full h-64 sm:h-96">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
     
      {/* Other Sections... */}
        {/* Top Customers */}
        <div className="p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Top Customers</h2>
        <ul>
          {topCustomers.map((customer, index) => (
            <li key={index} className="py-2 border-b">
              <p className="font-bold">{customer.userName}</p>
              <p>Email: {customer.email}</p>
              <p>Total Spent: Rs.{customer.totalSpent}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Orders */}
      <div className="p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="text-left bg-gray-300 text-gray-800">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index} className="bg-white even:bg-gray-200">
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.userId.username}</td>
                  <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">Rs.{order.totalPrice}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
  );
};

export default Dashboard;
