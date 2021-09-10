const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/index");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const { connect } = require("mongoose");
const pushSampleData = require("../sample-data");

const startMongooseConnection = async (url) => {
  try {
    const mongo = await connect(`${url}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return await mongo.connection;
  } catch (e) {
    throw new Error("Mongoose Error : ", e);
  }
};

const startServer = async () => {
  dotenv.config(__dirname + "../.env");
  app.use(cors());
  app.use(express.json());

  const mongoConnection = await startMongooseConnection(process.env.MONGO_URL);
  //const isDataPushed = await pushSampleData();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  const PORT = process.env.PORT;

  app.use("/", (req, res) => {
    res.send(
      `[App-Server-Message] Welcome to GraphQL server. Use GraphQL endpoint at http://localhost:${PORT}/graphql`
    );
  });

  app.listen(PORT, () => {
    console.log(
      colors.magenta(
        `[App-Server-Message] Graphql Palyground is running on http://localhost:${PORT}/graphql`
      )
    );
  });
};

startServer();
