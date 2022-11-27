import { MongoClient, Db } from 'mongodb';

// let db: Db | undefined;
// let client: MongoClient | undefined;

const getDb = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();
  return { db, client };
};

export default getDb;
