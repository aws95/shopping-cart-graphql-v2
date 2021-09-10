const { Product } = require("../models/Product");
const { Cart } = require("../models/Cart");

exports.getProducts = async () => {
  return Product.find();
};

exports.getCarts = async () => {
  return Cart.find();
};

exports.getProduct = async (product_id, sku) => {
  if (product_id !== "") {
    return Product.findOne({ _id: product_id });
  }
  if (sku !== "") {
    return Product.findOne({ sku: sku });
  }
  return null;
};

exports.getCart = async (id) => {
  return Cart.findOne({ _id: id });
};

exports.createEmptyCart = async () => {
  const emptyCart = await Cart.create({
    id: "",
    items: [],
    total_count: 0,
    total_price: 0,
  });
  const res = await emptyCart.save();
  return res;
};

exports.addProductToCart = async (id, product_id) => {
  const product = await Product.findOne({ _id: product_id });

  const found = await Cart.find({ _id: id });

  const cartItems = found[0].items;
  let cart;
  const isProductInCart = cartItems.filter((item) =>
    item.product._id.equals(product?._id)
  ).length;

  if (isProductInCart > 0) {
    cart = await Cart.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          "items.$[elem].count": product?.qty,
          total_count: 1,
          total_price: product?.price || 0,
        },
      },
      {
        arrayFilters: [{ "elem.product._id": product?._id }],
        multi: true,
        new: true,
        upsert: true,
      }
    );
  } else {
    cart = await Cart.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          items: { product: product, count: product?.qty },
        },
        $inc: {
          total_count: 1,
          total_price: product?.price || 0,
        },
      },
      { upsert: true, new: true }
    );
  }

  return cart;
};

exports.deleteProductFromCart = async (id, product_id) => {
  const product = await Product.findOne({ _id: product_id });
  const found = await Cart.find({ _id: id });
  const cartItem = found[0].items.filter((item) =>
    item.product._id.equals(product?._id)
  )[0];

  const cart = await Cart.findOneAndUpdate(
    { _id: id },
    {
      $inc: {
        total_count: -cartItem.count,
        total_price: -(cartItem.count * (product?.price || 1) || 0),
      },
      $pull: { items: { "product._id": product?._id } },
    },
    {
      new: true,
      multi: true,
    }
  );
  return cart;
};

exports.decrementProductFromCart = async (id, product_id) => {
  const product = await Product.findOne({ _id: product_id });
  const found = await Cart.find({ _id: id });
  const cartItem = found[0].items.filter((item) =>
    item.product._id.equals(product?._id)
  )[0];
  if (cartItem.count <= 1) {
    return found[0];
  }
  const cart = await Cart.findOneAndUpdate(
    { _id: id },
    {
      $inc: {
        "items.$[elem].count": -1,
        total_count: -1,
        total_price: -(product?.price || 0),
      },
    },
    {
      arrayFilters: [{ "elem.product._id": product?._id }],
      multi: true,
      new: true,
      upsert: true,
    }
  );
  return cart;
};

exports.emptyCart = async (id) => {
  const cart = await Cart.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        total_count: 0,
        total_price: 0,
        items: [],
      },
    },
    { new: true, multi: true }
  );
  return cart;
};
