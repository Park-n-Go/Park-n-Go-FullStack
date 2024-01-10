
import { updateSociety } from "@/Controller/Society/CRUD";
import { dbConnect } from "@/Utils/connectDB";
import { NextResponse } from 'next/server'

export async function PATCH(req,res) {
    try {
      
        const body = await req.json();
   
    if(!body.hasOwnProperty('societyID'))
    {
     
        return NextResponse.json({error_message:"societyID field is missing!"}, {status:400})
      
    }

    await dbConnect()
const response = await updateSociety({body})



return NextResponse.json(response.body,response.status)
    } catch (error) {
       if(error.message === 'Unexpected end of JSON input'){
        return NextResponse.json({error_message:'Payload is missing!'},{status:400})
       }
        return NextResponse.json({error_message:error.message},{status:400})
    }
    
    


}
