import { ObjectId } from "mongodb";
import { getDb } from "../config/mongodb";
import { TUser } from "@/validation/user";
import { hashPassword } from "../helpers/bcrypt";

export class User {
    static async findAll() {
        const db = await getDb();
        return await db.collection("users").aggregate([
            {
                $project: {
                    password: 0,
                    createdAt: 0,
                    updatedAt: 0
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
                    password: 0,
                    createdAt: 0,
                    updatedAt: 0
                }
            })
    }

    static async create(data: TUser) {
        const db = await getDb();
        data.password = hashPassword(data.password)
        const { insertedId } = await db.collection("users").insertOne({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        return await User.findById(insertedId.toString())
    }
}