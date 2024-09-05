// create mongodb connection
import { MongoClient } from "mongodb";

// singleton
let client: MongoClient

const CONNECTION_STRING = process.env.MONGODB_URI

if (!CONNECTION_STRING) throw new Error('No MONGODB_URI env provided!')

const getMongoClient = async () => {
    if (!client) {
        client = new MongoClient(CONNECTION_STRING)
        await client.connect()
    }

    return client
}

export const getDb = async () => {
    const mongoClient = await getMongoClient()
    return mongoClient.db('lecture-p3')
}