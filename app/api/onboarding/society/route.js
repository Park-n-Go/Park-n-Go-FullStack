
import { createSociety } from "@/Controller/Society/CRUD";
import { dbConnect } from "@/Utils/connectDB";
import { NextResponse } from 'next/server'

export async function POST(req) {
    
    const body= await req.json()
    if(!body)
    {
        return new Response({error_message:"No Payload!"}, {status:400});
    }
    await dbConnect()
const res = await createSociety ({body})

return NextResponse.json(res.body,res.status)


}
