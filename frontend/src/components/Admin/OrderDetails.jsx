import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
import endpoints from "../../api/endpoints";

const OrderDetails = () => {
  const { orderId } = useParams(); // Use only orderId
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(endpoints.ADMIN.GET_SINGLE_ORDER(orderId));
        console.log("hello",endpoints.ADMIN.GET_SINGLE_ORDER); // Check its value

        const orders = res.data.data.orders;

        // Find the specific order by orderId
        const foundOrder = orders.find((o) => o._id === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError("Order not found.");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order details.");
      }
    };
    fetchOrder();
  }, [orderId]);


  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-red-600">{error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-gray-600">
          Loading order details...
        </div>
      </div>
    );
  }
  console.log("Order Products:", order.products);


  return (
    <div className="container mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 text-pink border-b pb-4">
        Order Details - ID: {order.orderId}
      </h2>

      <div className="mb-4 text-lg">
        <strong>Customer:</strong> {order.userId?.username || "unknown"}
      </div>
      <div className="mb-4 text-lg">
        <strong>Status:</strong>{" "}
        <span className="text-red-700">{order.status || "Pending"}</span>
      </div>
      <div className="mb-4 text-lg">
        <strong>Total Items:</strong> {order.totalItem}
      </div>
      <div className="mb-4 text-lg">
        <strong>Total Price:</strong>{" "}
        <span className="text-green-700">Rs. {order.totalPrice}</span>
      </div>
      <div className="mb-4 text-lg">
        <strong>Order Date:</strong>{" "}
        {new Date(order.createdAt).toLocaleDateString()}
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-pink border-b pb-2">
        Ordered Items
      </h3>
      
      
      <ul className="space-y-4">
        {order.products.map((item, index) => (
          <li key={index} className="flex items-center space-x-4 p-4 border-b">
            <img
              src={item.productId?.image || "https://via.placeholder.com/100"}
              alt={item.productId?.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-700">
                {item.productId.name}
              </h4>
              <div className="text-gray-500">Brand: {item.productId.brand}</div>
              <div className="text-gray-500">Quantity: {item.quantity}</div>
              <div className="text-gray-500">
                Price: Rs. {item.productId.price}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link
          to="/admin/orders"
          className="text-grey-light bg-pink-light font-bold py-2 px-6 rounded transition duration-300"
        >
          Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
