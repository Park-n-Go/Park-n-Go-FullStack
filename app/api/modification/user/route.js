import { updateUser } from "@/Controller/User/CRUD";
import { dbConnect } from "@/Utils/connectDB";
import { NextResponse } from 'next/server'

export async function PATCH(req) {
try {
    const body= await req.json();
    if(!body.hasOwnProperty('userID') && !body.hasOwnProperty('id') && !body.hasOwnProperty('_id') && !body.hasOwnProperty('userName'))
    {
     
        return NextResponse.json({error_message:"userID, id, _id and userName field is missing! Provide atleast one field"}, {status:400})
      
    }

        await dbConnect()
        const res = await updateUser ({body})
        
        return NextResponse.json(res.body,res.status)



} catch (error) {
    if(error.message === 'Unexpected end of JSON input'){
        return NextResponse.json({error_message:'Payload is missing!'},{status:400})
       }
        return NextResponse.json({error_message:error.message},{status:400})
}



}
