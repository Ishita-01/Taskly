import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST() {
    const {userId} = await auth();

    if(!userId){
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }

    // capturing payment details

    try {
        const user = await prisma.user.findUnique({where:{id: userId}});
        if(!user){
            return NextResponse.json({error:"User not found"},{status:404})
        }

        const subscriptionEnds = new Date();
        subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);
        
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                subscriptionEnd: subscriptionEnds,
                isSubscribed: true
            }
        });
        return NextResponse.json({message:"Subscription successful",  subscriptionEnds: updatedUser.subscriptionEnd,} );
        
    } catch (error) {
        console.error("Error during subscription:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }


}

export async function GET() {
    const {userId} = await auth();

    if(!userId){
        return NextResponse.json({error:"Unauthorized"},{status:401});
    }

    try {
        const user = await prisma.user.findUnique({
            where:{id: userId},
            select:{
                isSubscribed: true,
                subscriptionEnd: true
            }
        });
        if(!user){
            return NextResponse.json({error:"User not found"},{status:404});
        }
        const now = new Date();
        if(user.subscriptionEnd && user.subscriptionEnd < now){
            const updatedUser = await prisma.user.update({
                where: { id: userId as string },
                data: {
                    isSubscribed: false,
                    subscriptionEnd: null
                }
            });

            return NextResponse.json({message:"Subscription ended", user: updatedUser}, {status: 200}); 
        }

        return NextResponse.json({isSubscribed: user.isSubscribed, subscriptionEnd: user.subscriptionEnd}, {status: 200});
    } catch (error) {
        
        console.error("Error fetching subscription status:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});

    }
}

