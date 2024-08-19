const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://farooqammar51:2Z9cPlQs8kp91l9j@cluster0.zkymg.mongodb.net/to-do_db";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client.connect();

module.exports = client;
