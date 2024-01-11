import { createUser } from "@/Controller/User/CRUD";
import { dbConnect } from "@/Utils/connectDB";
import { NextResponse } from 'next/server'

export async function POST(req) {
    const body= await req.json()
    if(Object.keys(body)?.length === 0)
    {
     
        return NextResponse.json({error_message:"Payload is missing!!!"}, {status:400})
      
    }
    await dbConnect()
const res = await createUser ({body})

return NextResponse.json(res.body,res.status)


}
