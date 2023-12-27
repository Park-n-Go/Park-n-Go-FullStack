
import { deleteSociety } from "@/Controller/Society/CRUD";
import { dbConnect } from "@/Utils/connectDB";
import { NextResponse } from 'next/server'

export async function DELETE(req,res) {
    try {
        const body= await req.json()
    if(!body)
    {
        return new Response({error_message:"No Payload!"}, {status:400});
    }
    await dbConnect()
const res = await deleteSociety({body})

if(res?.body?.isDeleted){
    return new Response(null,{status:204})    
}
throw new Error('Society deletion failed!');
} catch (error) {
        return NextResponse.json({error_message:error.message},{status:400})
    }
    
    


}
