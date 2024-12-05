const endpoints = {
    AUTH: {
      LOGIN: "/users/login",
      REGISTER: "/users/register",
    },
    PRODUCTS: {
      GET_ALL: "/products",
      GET_FEATURED: "/products/featured", 
      GET_SINGLE: (id) => `/products/${id}`,
      GET_CATEGORY:(categoryname) => `/products/category/${categoryname}`,
      SEARCH: (keyword) => `/products/search?keyword=${keyword}`,
    },
    CART: {
      GET_CART: (userId) => `/cart/${userId}`,
      ADD_TO_CART: (userId) => `/cart/${userId}`,
      REMOVE_FROM_CART: (userId, productId, size) => `/cart/${userId}/remove/${productId}/${size}`,
      UPDATE_CART: (userId) => `/cart/${userId}`,
      CART_TOTAL: (userId) => `/cart/${userId}/total-price`,
      CART_ITEMS: (userId) => `/cart/${userId}/total-items`,
      CLEAR_CART: (userId) => `/cart/${userId}/clear`,

    },
    WISHLIST: {
      GET_WISHLIST:(userId) => `/wishlist/${userId}`,
      ADD_TO_WISHLIST:(userId) => `/wishlist/${userId}`,
      REMOVE_FROM_WISHLIST:(userId) => `/wishlist/${userId}`,
      ADD_FROM_WISHLIST:(userId) => `/wishlist/${userId}/add-cart`,
      CLEAR_WISHLIST:(userId) => `/wishlist/${userId}/clear`,
    },
    PROFILE: {
      GET_PROFILE:(userId) => `/profile/${userId}`,
      UPDATE_PROFILE: (userId) => `/profile/${userId}`,
    },
    ORDERS: {
      CREATE: (userId) => `/orders/${userId}/checkout`,
      GET_USER_ORDERS: (userId) => `/orders/${userId}`,
    },
    ADMIN: { 
      GET_ALL_USERS: "/admin/users",
      GET_SINGLE_USER : (userId) => `/admin/users/${userId}`,
      BLOCK_USER:  (userId) => `/admin/users/block/${userId}`,
      UNBLOCK_USER:  (userId) => `/admin/users/unblock/${userId}`,
      GET_ALL_PRODUCTS: "/admin/products",
      ADD_PRODUCT: "/admin/products",
      GET_SINGLE_PRODUCT: (productId) => `/admin/products/${productId}`,
      EDIT_PRODUCT: (productId) => `/admin/products/${productId}`,
      DELETE_PRODUCT: (productId) => `/admin/products/${productId}`,
      GET_ALL_ORDERS: "/admin/orders",
      GET_SINGLE_ORDER: (orderId) => `/admin/orders/${orderId}`,
      
    }
  };
  
  export default endpoints;
  