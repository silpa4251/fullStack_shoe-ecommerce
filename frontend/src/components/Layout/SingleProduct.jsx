import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchProductsByCategory,
  selectProductsByCategory,
} from "../../features/productSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../features/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products.productById);
  const relatedProducts = useSelector(selectProductsByCategory) || [];
  const { status, error } = useSelector((state) => state.products);

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
      dispatch(addToCart({ ...product, size: selectedSize, quantity: 1 }));
    }
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
    <div className="container mx-auto p-6 md:p-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="flex-shrink-0">
          <img
            src={product?.image_url}
            alt={product?.name}
            className="w-full h-64 object-cover md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg products-image"
          />
        </div>
        <div className="p-6 flex-1">
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
          <button
            onClick={handleCart}
            className="py-2 px-4 rounded-lg product-btn transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12 mx-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Similar Products</h2>
        <div className="flex flex-wrap -mx-4">
        {relatedProducts && relatedProducts.length > 0 ? (
            relatedProducts.filter((relatedproduct) => relatedproduct._id !== product._id)
            .map((relatedProduct) => (
              <div
                key={relatedProduct._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
              >
                <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                  <Link to={`/products/${relatedProduct._id}`}>
                    <img
                      src={relatedProduct?.image_url}
                      alt={relatedProduct?.name}
                      className="w-full h-48 object-contain mb-4 product-image"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {relatedProduct?.name}
                      </h3>
                      <p className="text-gray-600">Rs.{relatedProduct?.price}</p>
                      <button
                        onClick={() => dispatch(addToCart(relatedProduct))}
                        className="py-2 px-4 rounded-lg product-btn transition duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No related products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
