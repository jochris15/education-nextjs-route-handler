import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { TUser } from "@/validation/user";

export class User {
    static async findAll() {
        const db = await getDb();
        return await db.collection("users").aggregate([
            {
                $project: {
                    password: 0
                }
            }
        ]).toArray()
    }

    static async findById(id: string) {
        const db = await getDb();
        const _id = new ObjectId(id)

        return await db.collection("users").findOne(
            { _id },
            {
                projection: {
                    password: 0
                }
            })
    }

    static async create(data: TUser) {
        const db = await getDb();
        const { insertedId } = await db.collection("users").insertOne(data)

        return await User.findById(insertedId.toString())
    }
}