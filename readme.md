# NextJS Route Handler

[Dokumentasi route handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

Dengan menggunakan route handler, kita bisa membuat custom request handlers dengan menggunakan **Web Request & Response API**. Hanya bisa dibuat didalam folder app, biasanya didalam folder api kita membuat route.ts

## Next Response & Next Request (Extended version)
[Dokumentasi extended](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#extended-nextrequest-and-nextresponse-apis)

## Dynamic Route Segment
[Dokumentasi dynamic route](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments)

## Intregation with MongoDB
Untuk setup confignya, buatlah sebuah folder **/app/db/config/mongodb.ts**
<br>
NextJS by default udah ada .env nya, buatlah sebuah file .env.[environment], karena kita masih tahap development , jadi .env.development untuk menyimpan connection string mongodb.

```ts
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
    return mongoClient.db('sample_mflix')
}
```

next step, buatlah sebuah folder **/app/db/models/user.model.ts** untuk membuat model user.

## FindAll

```ts
import { getDb } from "../config/mongodb";

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
}
```

## FindById
```ts
import { getDb } from "../config/mongodb";

export class User {
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
}
```

## Create

Untuk membuat data baru, kita perlu mengambil body dari data yang ingin kita input, cara mengambilnya dengan menggunakan **request.json()**
<br>
<br>
Logic untuk membuat data baru :
1. perlu validasi terlebih dahulu
2. create data
3. response
<br>
<br>

Untuk validasi, kita menggunakan [**zod**](https://www.npmjs.com/package/zod) yaitu sebuah package untuk membantu melakukan validasi di ts. Buatlah sebuah folder **/src/validation/user.ts**
