import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchProductsByCategory,
  selectProductsByCategory,
} from "../../features/productSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../features/cartSlice";
import getUserId from "../../utils/getUserId";
import { toggleWishlistItem } from "../../features/wishlistSlice";
import ProductLists from "./ProductList";

const SingleProduct = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const userId = getUserId();

  const product = useSelector((state) => state.products.productById);
  const relatedProducts = useSelector(selectProductsByCategory) || [];
  const { status, error } = useSelector((state) => state.products);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isInWishlist = wishlist.some((item) => item.productId === product?._id);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.category) {
      dispatch(fetchProductsByCategory(product.category));
    }
  }, [dispatch, product]);

  const handleCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    if (product) {
      dispatch(addToCart({ userId, productId: product._id, size: selectedSize, quantity: 1 }));
      toast.success(`${product.name} (Size: ${selectedSize}) added to cart!`);
    }
  };

  const handleWishlist = () => {
    dispatch(toggleWishlistItem({ userId, productId: product._id }));
    toast.success(
      isInWishlist
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`
    );
  };

  if (status === "loading") {
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-lg text-red-600">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-lg text-gray-600">Product not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 p-4">
          <img
            src={product?.image_url}
            alt={product?.name}
            className="w-full h-auto object-contain rounded-lg shadow-md"
          />
        </div>
        {/* Product Details */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product?.name}</h1>
          <p className="text-xl text-gray-600 mb-2">{product?.brand}</p>
          <div className="mb-4">
            <p className="text-xl text-gray-500 line-through">
              MRP: Rs.{(product?.price + (50 * product?.price) / 100).toFixed(2)}
            </p>
            <p className="text-2xl font-semibold text-green-600">
              Offer price: Rs.{product?.price?.toFixed(2)}
            </p>
          </div>
          <p className="text-gray-700 mb-4">{product?.description}</p>

          <div className="mb-4">
            <p className="text-xl text-gray-600 mb-2">Available sizes:</p>
            <div className="flex space-x-2">
              {product?.available_sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-4 rounded-lg border-2 ${
                    selectedSize === size
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xl text-gray-600 mb-2">Warranty: {product?.warranty}</p>
          <p className="text-gray-600">{product?.additional_details}</p>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleCart}
              disabled={!selectedSize}
              className={`py-2 px-4 rounded-lg text-grey-light bg-pink-light hover:bg-pink transition duration-300 ${
                !selectedSize ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className={`py-2 px-4 rounded-lg transition duration-300 ${
                isInWishlist ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl text-center font-semibold m-6 text-pink">Similar Products</h2>
        <ProductLists
          products={relatedProducts.filter(
            (relatedProduct) => relatedProduct._id !== product._id
          )}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
