const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt,GraphQLFloat } = graphql;
const ProductType = require('./ProductType')

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    product:{type:ProductType},
    count: { type: GraphQLInt },
  }),
});



const CartType = new GraphQLObjectType({
  name: "Cart",
  fields: () => ({
    id: { type: GraphQLID },
    items: { type: new GraphQLList(ItemType) },
    total_count: { type: GraphQLInt },
    total_price: { type: GraphQLFloat },
  }),
});

module.exports = CartType;
