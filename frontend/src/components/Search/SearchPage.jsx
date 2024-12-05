import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ProductLists from '../Layout/ProductList';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('name');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]); 

  

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    console.log(error) ;
  }

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {filteredProducts.length > 0 ? (
        <ProductLists products={filteredProducts} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchPage;
