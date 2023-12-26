
import { updateSociety } from "@/Controller/Society/CRUD";
import { dbConnect } from "@/Utils/connectDB";
import { NextResponse } from 'next/server'

export async function PATCH(req) {
    try {
        const body= await req.json()
    console.log(body)
    if(!body)
    {
        return new Response({error_message:"No Payload!"}, {status:400});
    }
    await dbConnect()
const res = await updateSociety({body})

return NextResponse.json(res.body,res.status)
    } catch (error) {
        return NextResponse.json({error_message:error},res.status)
    }
    
    


}
