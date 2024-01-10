
import { deleteUser } from "@/Controller/User/CRUD";
import { dbConnect } from "@/Utils/connectDB";
import { NextResponse } from 'next/server'

export async function DELETE(req,res) {
    try {
        const body= await req.json();
        if(!body.hasOwnProperty('userID'))
        {
         
            return NextResponse.json({error_message:"userID field is missing!"}, {status:400})
          
        }
    await dbConnect()
const res = await deleteUser({body})
return NextResponse.json(res.body,res.status)
} catch (error) {
    if(error.message === 'Unexpected end of JSON input'){
        return NextResponse.json({error_message:'Payload is missing!'},{status:400})
       }
        return NextResponse.json({error_message:error.message},{status:400})
    }
    
    


}
