import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct, fetchProducts, fetchProductsByCategory, searchProducts } from "../../features/productSlice";
import { useDispatch, useSelector } from "react-redux";


const AllProducts = () => {
    // const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);
  
  // Fetch all products on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
    
    useEffect(() => {
        // Extract unique categories from products
        const uniqueCategories = [...new Set(products.map((pro) => pro.category))];
        setCategories(uniqueCategories);
      }, [products]);
 

      const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        dispatch(searchProducts(term));
      };
    
      const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        dispatch(fetchProductsByCategory(category));
      };
    
      const handleAdd = () => {
        navigate("/admin/add-product");
      };
    
      const handleEdit = (id) => {
        navigate(`/admin/productlist/${id}`);
      };
    
      const handleDlt = (id) => {
        dispatch(deleteProduct(id))
          .unwrap()
          .then(() => {
            toast.success("Product deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product.");
          });
      };
      
    
      return (
        <div className="p-6 bg-white shadow rounded-lg mt-6">
          <h2 className="text-3xl font-semibold text-pink mb-4">Products</h2>
          <div className="flex flex-col lg:flex-row lg:justify-end mb-4 space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative w-full lg:w-auto">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full lg:w-60 border rounded p-2 pr-10"
                />
                <FaSearch size={20} className="absolute right-3 top-3 text-pink" />
              </div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border rounded p-2 w-full lg:w-auto"
              >
                <option value="">All Categories</option>
                {categories && categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 w-full lg:w-auto"
              >
                Add Product
              </button>
            </div>
          </div>
    
          <div className="overflow-x-auto">
            {status === 'loading' ? (
              <p>Loading products...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <table className="min-w-full border border-gray-200 text-sm lg:text-base">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="border px-4 py-2 text-left">Product Name</th>
                    <th className="border px-4 py-2 text-left">Brand</th>
                    <th className="border px-4 py-2 text-left">Price</th>
                    <th className="border px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="border px-4 py-2 text-center">
                        No products available
                      </td>
                    </tr>
                  ) : (
                    products.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-gray-200">
                        <td className="border px-4 py-2">{item.name}</td>
                        <td className="border px-4 py-2">{item.brand}</td>
                        <td className="border px-4 py-2">Rs.{item.price}</td>
                        <td className="border px-4 py-2">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(item._id)}
                              className="bg-blue-500 text-white px-3 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDlt(item._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    };
    
    export default AllProducts;