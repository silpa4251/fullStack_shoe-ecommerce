export const totalItem = (cart) => cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

export const totalPrice = (cart) =>
    cart.reduce((sum, item) => sum + (item.productId.price * item.quantity || 0), 0);
  

export const totalWish = (wishlist) => {
    return wishlist.length;
}