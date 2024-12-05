import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleWishlistItem, fetchWishlist } from "../../features/wishlistSlice";
import getUserId from "../../utils/getUserId";

const ProductLists = ({ products = [] }) => {
  const userId = getUserId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);
  const [tempWishlist, setTempWishlist] = useState(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("tempWishlist"));
    return Array.isArray(storedWishlist) ? storedWishlist : [];
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    localStorage.setItem("tempWishlist", JSON.stringify(tempWishlist));
  }, [tempWishlist]);


useEffect(() => {
  if (wishlist) {
    const syncedWishlist = wishlist.map((item) => item.productId._id);
    setTempWishlist(syncedWishlist);
  }
}, [wishlist]);

  useEffect(() => {
    if (userId && wishlist) {
      const backendWishlistIds = wishlist.map((item) => item.productId._id);
      setTempWishlist(backendWishlistIds);
    }
  }, [wishlist, userId]);
  

  if (!Array.isArray(products)) {
    console.error("Invalid products array:", products);
    return <div className="text-center">Invalid product data.</div>;
  }

  if (loading) {
    return <div className="text-center">Loading Products...</div>;
  }

  if (error) {
    console.error("Error fetching wishlist:", error);
    return (
      <div className="text-center text-red-500">
        Error: {error.message || "Something went wrong"}
      </div>
    );
  }

  const handleView = (product) => navigate(`/products/${product._id}`);

  const handleWishlist = (product) => {
    if (userId) {
      dispatch(toggleWishlistItem({ userId, productId: product._id }))
        .then(() => {
          dispatch(fetchWishlist(userId)); // Ensure backend state is synced
        });
    } else {
      if (tempWishlist.includes(product._id)) {
        setTempWishlist(tempWishlist.filter((id) => id !== product._id));
      } else {
        setTempWishlist([...tempWishlist, product._id]);
      }
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <div className="flex flex-wrap -mx-4">
        {products.map((product) => {
          if (!product || typeof product !== "object") {
            console.error("Invalid product object:", product);
            return null;
          }

          const isInWishlist = userId
  ? wishlist.some((item) => item?.productId?._id === product._id)
  : tempWishlist.includes(product._id);


          return (
            <div
              key={product._id || Math.random()}
              className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
            >
              <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                <Link to={`/products/${product._id || ""}`}>
                  <img
                    src={product.image_url || "fallback-image-url.png"}
                    alt={product.name || "Product"}
                    className="h-48 w-full object-contain mb-4  transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    {product.name || "Unknown Product"}
                  </h2>
                  <p className="text-gray-700">
                    Rs.{product.price || "N/A"}
                  </p>
                </Link>
                <button
                  onClick={() => handleView(product)}
                  className="mt-4 py-2 px-4 text-cream-pale bg-pink-light font-semibold rounded-lg transition duration-300 hover:bg-pink"
                >
                  View Details
                </button>
                <button
                  className="absolute top-4 right-4 text-red-700 hover:text-red-800 transition duration-300"
                  onClick={() => handleWishlist(product)}
                >
                  {isInWishlist ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductLists;
