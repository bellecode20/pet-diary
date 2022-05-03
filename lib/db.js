import { MongoClient } from "mongodb";
export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:miny9501@cluster0.roklt.mongodb.net/diary?retryWrites=true&w=majority"
  );
  return client;
}
