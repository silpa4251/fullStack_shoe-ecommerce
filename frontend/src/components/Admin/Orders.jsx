import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import endpoints from "../../api/endpoints";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // const [filteredOrders, setFilteredOrders] = useState([]);
  // const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(endpoints.ADMIN.GET_ALL_ORDERS); // Fetch all orders
        setOrders(res.data.data.orders); // Assume `orders` is the key in the response
        // setFilteredOrders(res.data.orders); // Set initial filtered orders
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // const filterOrders = (status) => {
  //   const filtered = orders.filter((order) => (status ? order.status === status : true));
  //   setFilteredOrders(filtered);
  // };

  // const handleStatusChange = (e) => {
  //   const status = e.target.value;
  //   setStatusFilter(status);
  //   filterOrders(status);
  // };

  const handleView = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  // const handleUpdateStatus = async (orderId, newStatus) => {
  //   try {
  //     await axios.patch(`/api/orders/${orderId}`, { status: newStatus }); // Update order status
  //     toast.success("Order status updated");

  //     // Update local state
  //     setOrders(
  //       orders.map((order) =>
  //         order._id === orderId ? { ...order, status: newStatus } : order
  //       )
  //     );
  //     setFilteredOrders(
  //       filteredOrders.map((order) =>
  //         order._id === orderId ? { ...order, status: newStatus } : order
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating order status:", error);
  //     toast.error("Failed to update order status");
  //   }
  // };

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-3xl font-semibold text-pink">Order Management</h2>
      {/* <div className="flex justify-end mb-4">
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="border rounded p-2"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>
      </div> */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-300">
              <th className="border px-4 py-2 text-left">Order ID</th>
              <th className="border px-4 py-2 text-left">Customer</th>
              <th className="border px-4 py-2 text-left">Total Items</th>
              <th className="border px-4 py-2 text-left">Total Price</th>
              {/* <th className="border px-4 py-2 text-left">Status</th> */}
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="border px-4 py-2 text-center"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-300">
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.userId.username}</td>
                  <td className="border px-4 py-2">{order.totalItem}</td>
                  <td className="border px-4 py-2">Rs.{order.totalPrice}</td>
                  {/* <td className="border px-4 py-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                      className="border rounded p-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td> */}
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleView(order._id)}
                      className="bg-blue-500 text-white px-3 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
