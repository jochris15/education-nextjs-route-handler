import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/db/models/user.model";
import { schemaUser } from "@/validation/user";
import { z } from "zod";

export async function GET(request: NextRequest) {
    const users = await User.findAll()
    return NextResponse.json({
        message: "Succeed get all users",
        users
    }, {
        status: 200
    });
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const data = await schemaUser.parseAsync(body)
        const user = await User.create(data)

        return NextResponse.json({
            message: "Succeed add new user",
            user
        }, {
            status: 201
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                message: error.errors[0].message,
            }, {
                status: 400
            });
        }
    }

}