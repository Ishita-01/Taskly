import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const Items_per_page = 10

export async function GET(req: NextRequest) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({error:"Unauthorized"},{status:401});
    }

    const {searchParams} = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1")
    const search = searchParams.get("search") || ""

    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId,
                title:{
                    contains: search,
                    mode:"insensitive"
                }
            },
            orderBy:{createdAt: "desc"},
            take: Items_per_page,
            skip: (page-1) * Items_per_page
        })

        const tot_items = await prisma.todo.count({
            where:{
                userId,
                title:{
                    contains: search, 
                    mode:"insensitive"
                }
            }
        })

        const tot_pages = Math.ceil(tot_items/Items_per_page)
        return NextResponse.json({
            todos,
            currentPage: page,
            TotalPages: tot_pages
        })
    } catch (error) {
        console.error("Error fetching todos:", error); 
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    const {userId} = await auth();
    if(!userId){
        return NextResponse.json({error:"Unauthorized"},{status:401});
    }

    try {
        const user = await prisma.user.findUnique({
            where: {id: userId},
            include: {todos: true}
        })

        if(!user){
            return NextResponse.json({error:"User not found"},{status:404})
        }

        if(!user.isSubscribed && user.todos.length >= 3){
            return NextResponse.json({error:"Subscribe to add more todos"},{status:403})
        }

        const {title} = await req.json()

        if(!title || title.trim() === ""){
            return NextResponse.json({error:"Title is required"},{status:400})
        }

        const newToDo = await prisma.todo.create({
            data: {
                title: title.trim(),
                userId
            }
        })

        return NextResponse.json(newToDo, {status: 201}) 
    } catch (error) {
        console.error("Error creating todo:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}