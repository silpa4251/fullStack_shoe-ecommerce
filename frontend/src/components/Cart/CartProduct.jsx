/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../features/cartSlice';
import { toast } from 'react-toastify';
import getUserId from '../../utils/getUserId';

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const userId = getUserId();

  // Find product in the cart based on id and size
  const productInCart = cart.find((p) => p.productId._id === product.productId._id && p.size === product.size);
  const quantity = productInCart ? productInCart.quantity : 0;

  // Dispatch actions to update quantity
  const handleIncrease = async () => {
    if (quantity < 20) {
      await dispatch(increaseQuantity({ userId, productId: product.productId._id, size: product.size }));
      toast.success(`${product.productId.name} quantity increased`, { toastId: "increaseQuantity" });
    } else {
      toast.warning("Maximum quantity reached", { toastId: "maxQuantity" });
    }
  };

  // Decrease quantity
  const handleDecrease = async () => {
    if (quantity > 1) {
      await dispatch(decreaseQuantity({ userId, productId: product.productId._id, size: product.size }));
      toast.success(`${product.productId.name} quantity decreased`, { toastId: "decreaseQuantity" });
    } else {
      toast.warning("Minimum quantity is 1", { toastId: "minQuantity" });
    }
  };

  // Remove from cart
  const handleRemoveFromCart = async  () => {
    if (userId) {
      await dispatch(removeFromCart({ userId, productId: product.productId._id, size: product.size }));
    } else {
      toast.error('Please log in to remove items from your cart');
    }
  };

  return (
    <div className="flex items-center border border-gray-300 p-4 mb-4 rounded-lg shadow-sm">
      <img 
        src={product.productId.image_url} 
        className="w-24 h-24 object-contain rounded-md" 
        alt={product.productId.name} 
      />
      
      <div className="ml-6 flex-1">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">{product.productId.name}</h4>
        <p className="text-gray-600">Size: {product.size}</p>
        <h5 className="text-xl font-semibold text-green-600 mb-4">Rs.{product.price}</h5>

        <div className="flex items-center space-x-4 border border-red-200 bg-gray-200 w-24">
          <button
            className="bg-gray-200 text-gray-800 rounded w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-300"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            className="bg-gray-200 text-gray-800 rounded w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-300"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>

        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          onClick={handleRemoveFromCart}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
