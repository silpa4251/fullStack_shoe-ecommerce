// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import endpoints from "../../api/endpoints";
import axiosInstance from "../../api/axiosInstance";

const EditProduct = () => {
  const { id } = useParams();
  console.log(" params edit id", id);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available_sizes: "",
    brand: "",
    image_url: "",
    in_stock: "",
    featured: false,
    stars: "",
    special_offer: "",
    discount: "",
    warranty: "",
    additional_details: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(endpoints.ADMIN.GET_SINGLE_PRODUCT(id)); // Updated endpoint
        setProduct(res.data.data.product); // Assuming the product is under `data.product` per your response structure
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.put(endpoints.ADMIN.EDIT_PRODUCT(id), product);
      console.log("Updated Product Response:", res.data);
      setLoading(false);
      toast.success(res.data.message || "Product updated successfully");
      navigate("/admin/productlist");
    } catch (error) {
      setLoading(false);
      console.error("Error updating product:", error);
      const message = error.response?.data?.message || "Error updating the product";
      toast.error(message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-3xl font-semibold mb-4 text-pink">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            <input
              type="checkbox"
              name="featured"
              checked={product.featured}
              onChange={handleChange}
              className="mr-2"
            />
            Featured
          </label>
        </div>
        <button
          type="submit"
          className="text-grey-light bg-pink-light px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
