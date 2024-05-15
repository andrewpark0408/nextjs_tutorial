import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from 'bcrypt';

const schema = z.object({
    email: z.string(),
    newPassword: z.string().min(5),
})

export async function POST(request: NextRequest){
    const body = await request.json();

    const validation = schema.safeParse(body)
    if(!validation.success){
        return NextResponse.json(validation.error.errors, {
            status: 400,
        });
    }
    
    const user = await prisma.user.findUnique({ where: { email: body.email }})

    if (!user || user.hashedPassword === null || !(await bcrypt.compare(body.currentPassword, user.hashedPassword))) {
        return NextResponse.json(
            { error: 'Current password is incorrect' }, 
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await prisma.user.update({
        where: { email: body.email },
        data: { hashedPassword }
    });

    return NextResponse.json({ message: 'Password changed successfully' })
}