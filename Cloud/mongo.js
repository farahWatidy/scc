const { MongoClient } = require('mongodb');
const util = require('util');

util.promisify(MongoClient.connect);

let dbConnection;

const connect = async () => {
  try {
    const client = await MongoClient.connect('mongodb+srv://farah:cloud123@cluster0.thibl.mongodb.net/?retryWrites=true&w=majority');
    dbConnection = client.db('Orders');
  } catch (e) {
    throw new Error(`Could not establish database connection: ${e}`);
  }
};

const mongoClient = async () => {
  if (!dbConnection) {
    await connect();
  }
  return dbConnection;
};

module.exports = {
  mongoClient,
};