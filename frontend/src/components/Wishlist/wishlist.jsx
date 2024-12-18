import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { fetchWishlist, toggleWishlistItem } from "../../features/wishlistSlice";
import getUserId from "../../utils/getUserId";
import { toast } from "react-toastify";

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);
  const userId = getUserId();

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    } else {
      toast.error('User not logged in');
      navigate('/login');
    }
  }, [userId, dispatch, navigate]);

  const handleAddProducts = () => navigate('/');
  const handleView = (productId) => navigate(`/products/${productId}`);

  const handleToggleWishlistItem = (productId) => {
    if (userId) {
      dispatch(toggleWishlistItem({ userId, productId }));
    }
    else {
      toast.error('Please log in to remove items from your cart');
    }
  };

  if (loading) {
    return <div className="text-center">Loading Wishlist...</div>;
  }

  if (error) {
    console.log(error.message);
  }

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold text-pink mb-6">Your Wishlist</h2>
      {wishlist && wishlist.length > 0 ? (
        
        <div className="flex flex-wrap -mx-4">
          {wishlist.map((product) => (
            <div
              key={product.productId._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
            >
              <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center relative">
                <Link to={`/products/${product.productId._id}`}>
                  <img
                    src={product.productId.image_url ||"placeholder.jpg"}
                    alt={product.productId.name || "Unnamed Product"}
                    className="h-48 w-full object-contain mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    {product.productId.name || "Unnamed product"}
                  </h2>
                  <p className="text-gray-700">Rs. {product.productId.price || 'N/A'}</p>
                </Link>
                <button
                  onClick={() => handleView(product.productId._id)}
                  className="mt-4 py-2 px-4 rounded bg-blue-500 text-white"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleToggleWishlistItem(product.productId._id)}
                  className="absolute top-4 right-4 text-red-700 hover:text-red-800"
                >
                  <FaHeart size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
              <p className="text-gray-600 text-2xl text-center mb-4">Your wishlist is empty!</p>
              <button
                onClick={handleAddProducts}
                className="text-grey-light bg-pink-light py-2 px-4 rounded-lg transition duration-300 hover:bg-pink"
              >
                Add products
              </button>
            </div>
      )
    }
    </div>
  );
};

export default WishList;
