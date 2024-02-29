import bcrypt from 'bcrypt'
import prisma from "@/libs/prismaDb"
import { NextResponse } from 'next/server'



export const POST = async (req: Request) => {
    const body = await req.json();
    const { name, email, password } = body


    
    const hashedPassword = await bcrypt.hash(password, 10)
    //Create One User
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            hashedPassword: hashedPassword
        }
    })

    return NextResponse.json(newUser)
}