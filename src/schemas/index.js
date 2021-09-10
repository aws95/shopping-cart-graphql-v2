const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = graphql;

const { CartType, ProductType } = require("./typeDefs/index");
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
} = require("../resolvers/index");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getProducts: {
      type: new GraphQLList(ProductType),
      args: {},
      resolve(parent, args) {
        return getProducts();
      },
    },
    getCarts: {
      type: new GraphQLList(CartType),
      args: {},
      resolve(parent, args) {
        return getCarts();
      },
    },
    getProduct: {
      type: ProductType,
      args: {
        product_id: { type: GraphQLString, defaultValue: "" },
        sku: { type: GraphQLString, defaultValue: "" },
      },
      resolve(parent, { product_id, sku }) {
        return getProduct(product_id, sku);
      },
    },
    getCart: {
      type: CartType,
      args: { id: { type: GraphQLString } },
      resolve(parent, { id }) {
        return getCart(id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createEmptyCart: {
      type: CartType,
      args: {},
      resolve(parent, args) {
        return createEmptyCart();
      },
    },
    addProductToCart: {
      type: CartType,
      args: {
        id: { type: GraphQLString },
        product_id: { type: GraphQLString },
      },
      resolve(parent, { id, product_id }) {
        return addProductToCart(id, product_id);
      },
    },
    deleteProductFromCart: {
      type: CartType,
      args: {
        id: { type: GraphQLID },
        product_id: { type: GraphQLID },
      },
      resolve(parent, { id, product_id }) {
        return deleteProductFromCart(id, product_id);
      },
    },
    decrementProductFromCart: {
      type: CartType,
      args: {
        id: { type: GraphQLID },
        product_id: { type: GraphQLID },
      },
      resolve(parent, { id, product_id }) {
        return decrementProductFromCart(id, product_id);
      },
    },
    emptyCart: {
      type: CartType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, { id }) {
        return emptyCart(id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
