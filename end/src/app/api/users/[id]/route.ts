import { NextRequest, NextResponse } from "next/server";
import { User } from "@/db/models/user.model";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const user = await User.findById(params.id)
    return NextResponse.json({
        message: `Succeed read user with id ${params.id}`,
        user
    }, {
        status: 200
    });
}