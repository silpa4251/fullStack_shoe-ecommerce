import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../slices/productSlice';
import ProductLists from './ProductLists';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query));
    }
  }, [dispatch, query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error searching products: {error}</div>;
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={query} 
        onChange={handleSearchChange} 
        className="p-2 border border-gray-300 rounded-md"
      />
      {products.length > 0 ? (
        <ProductLists products={products} />
      ) : (
        <div>No products found.</div>
      )}
    </div>
  );
};

export default SearchPage;
