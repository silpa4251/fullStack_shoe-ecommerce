import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../features/orderSlice";
import { clearCart } from "../features/cartSlice";
import { totalItem, totalPrice } from "../utils/cartHelper";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart); // Get cart items
  const user = useSelector((state) => state.user); // Get user info
  const { loading, currentOrder } = useSelector((state) => state.orders); // Get order state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('Cart State:', cart);
  console.log('User State:', user);
  

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  // Populate fields with user info
  useEffect(() => {
    if (user) {
      
      setName(user.username || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  // Handle order submission
  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!cart.length) {
      toast.error("Cart is empty. Add items to proceed!");
      return;
    }

    const shippingAddress = {
      name,
      address,
      phone,
      state,
      pincode,
      paymentMethod,
    };

    try {
      // Dispatch the `placeOrder` thunk
      await dispatch(placeOrder({ userId: user.id, shippingAddress }));

      toast.success("Order placed successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      dispatch(clearCart());
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  // Redirect if the order was placed successfully
  useEffect(() => {
    if (currentOrder) {
      navigate(`/orders/${currentOrder.orderId}`);
    }
  }, [currentOrder, navigate]);

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center checkout">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div className="bg-cream-medium shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-pink">Shipping Information</h2>
          <form onSubmit={handleOrderSubmit}>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-800">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-800">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-800">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="flex gap-4 mb-6">
              <div className="w-1/2">
                <label className="block text-lg font-medium mb-2 text-gray-800">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-lg font-medium mb-2 text-gray-800">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-800">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI payments">UPI Payments</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-cream-medium shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-pink">Order Summary</h2>
          {cart.map((item, index) => (
            <div key={index} className="mb-4 flex items-center justify-between bg-cream-dark">
              <div className="flex items-center">
                <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="text-lg font-medium text-pink">Rs.{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t border-gray-500 pt-4 mt-4">
            <p className="text-lg text-right font-medium">Total Items: <span className="font-semibold text-pink">{totalItem(cart)}</span></p>
            <p className="text-lg text-right font-medium">Total Price: <span className="font-semibold text-pink">Rs.{totalPrice(cart).toFixed(2)}</span></p>
          </div>
          <button
            type="submit"
            onClick={handleOrderSubmit}
            className="w-full text-grey-light bg-pink-light mt-6 font-semibold py-3 px-4 rounded-lg shadow-md"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;