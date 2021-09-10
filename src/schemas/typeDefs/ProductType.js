const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString,GraphQLID } = graphql;

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    sku: { type: GraphQLString },
    qty: { type: GraphQLInt },
    price:{ type: GraphQLInt },
    image:{ type: GraphQLString },
  }),
});

module.exports = ProductType;