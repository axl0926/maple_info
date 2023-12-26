import { MongoClient } from "mongodb";

const url = process.env.DB;

let connectDB;

if (!url) {
    throw new Error("DB env error");
} else {
    if (process.env.NODE_ENV === "development") {
        if (!global._mongo) {
            global._mongo = new MongoClient(url).connect();
        }
        connectDB = global._mongo;
    } else {
        connectDB = new MongoClient(url).connect();
    }
}

export { connectDB };