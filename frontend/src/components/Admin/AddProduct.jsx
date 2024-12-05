/* eslint-disable no-unused-vars */
import { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addProduct, fetchProducts } from '../../features/productSlice';
import { useDispatch } from 'react-redux';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Men',
    available_sizes: '',
    brand: '',
    image_url: '',
    in_stock: true,
    featured: false,
    stars: '',
    special_offer: 'None',
    discount: 0,
    warranty: '',
    quantity: 1,
    additional_details: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productToSubmit = {
      ...product,
      available_sizes: product.available_sizes.split(',').map(size => size.trim()),
      stars: parseFloat(product.stars),
      price: parseFloat(product.price),
      discount: parseFloat(product.discount),
    };
  
    try {
      await dispatch(addProduct(productToSubmit)).unwrap(); // Add the product to Redux
      await dispatch(fetchProducts());
      toast.success('Product added successfully');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error('An error occurred while adding the product.');
    }
  };
  

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-3xl font-semibold mb-4 text-pink">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Product Name</label>
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
          <label className="block text-sm font-medium">Brand</label>
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
          <label className="block text-sm font-medium">Price (Rs)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        
        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Available Sizes (comma separated)</label>
          <input
            type="text"
            name="available_sizes"
            value={product.available_sizes}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Featured</label>
          <input
            type="checkbox"
            name="featured"
            checked={product.featured}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-sm font-medium">Stars (out of 5)</label>
          <input
            type="number"
            name="stars"
            value={product.stars}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            step="0.1"
          />
        </div> */}

        <button type="submit" className="text-grey-light bg-pink-light px-4 py-2 rounded transition duration-200">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
