import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartProduct from '../components/Cart/CartProduct';
import { totalItem, totalPrice } from '../utils/cartHelper';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, fetchCart } from '../features/cartSlice';
import { toast } from 'react-toastify';
import getUserId from '../utils/getUserId';

const Cart = () => {
  const { cart, status, error } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = getUserId();
 
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    } else {
      toast.error('User not logged in');
      navigate('/login');
    }
  }, [dispatch, userId, navigate]);

  const handleAddProducts = () => navigate('/');
  const handleCheckout = () => navigate('/checkout');

  const handleRemoveFromCart = (productId, size) => {
    if (userId) {
      dispatch(removeFromCart({ userId, productId, size }));
    } else {
      toast.error('Please log in to remove items from your cart');
    }
  };

  if (status === 'loading') {
    return <div className="text-center">Loading cart...</div>;
  }

  if (status === 'failed' && error) {
    console.log(error.message);
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cart && cart?.length > 0 ? (
            cart.map((product) => (
              <CartProduct
                key={`${product.productId._id}-${product.size}`}
                product={product}
                remove={handleRemoveFromCart}
              />
            ))
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-gray-600 text-2xl text-center mb-4">Your cart is empty!</p>
              <button
                onClick={handleAddProducts}
                className="text-grey-light bg-pink-light py-2 px-4 rounded-lg transition duration-300 hover:bg-pink"
              >
                Add products
              </button>
            </div>
          )}
        </div>

        {cart && cart.length > 0 && (
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
            <div className="mb-6">
              <p className="text-lg font-medium">
                Total Items: <span className="font-semibold">{totalItem(cart)}</span>
              </p>
              <p className="text-lg font-medium">
                Total Price: <span className="font-semibold">Rs.{totalPrice(cart).toFixed(2)}</span>
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-300"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
