import bcrypt from 'bcrypt';
import prisma from '@/libs/prismaDb';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    console.log("first")
    const body = await req.json();
    console.log("second => ", body)
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("password = > ", password)
    console.log("hashedPassword = > ", hashedPassword)
    try {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                hashedPassword: hashedPassword,
            },
        });

        return NextResponse.json(newUser);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
};