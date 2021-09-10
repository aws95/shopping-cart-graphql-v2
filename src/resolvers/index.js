const {
  getProducts,
  getCarts,
  getProduct,
  getCart,
  createEmptyCart,
  addProductToCart,
  deleteProductFromCart,
  decrementProductFromCart,
  emptyCart,
} = require("../services/index");

exports.getProducts = async () => {
  return getProducts();
};

exports.getCarts = async () => {
  return getCarts();
};

exports.getProduct = async (product_id, sku) => {
  return getProduct(product_id, sku);
};

exports.getCart = async (id) => {
  return getCart(id);
};

exports.createEmptyCart = async () => {
  return createEmptyCart();
};

exports.addProductToCart = async (id, product_id) => {
  return addProductToCart(id, product_id);
};

exports.deleteProductFromCart = async (id, product_id) => {
  return deleteProductFromCart(id, product_id);
};

exports.decrementProductFromCart = async (id, product_id) => {
  return decrementProductFromCart(id, product_id);
};

exports.emptyCart = async (id) => {
  return emptyCart(id);
};
