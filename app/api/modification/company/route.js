
import { updateCompany } from "@/Controller/Company/CRUD";
import { dbConnect } from "@/Utils/connectDB";
import { NextResponse } from 'next/server'

export async function PATCH(req) {
    try {
        
        
        const body = await req.json();
   
    if(!body.hasOwnProperty('companyID'))
    {
     
        return NextResponse.json({error_message:"companyID field is missing!"}, {status:400})
      
    }
    await dbConnect()
const res = await updateCompany ({body})

return NextResponse.json(res.body,res.status)

    } catch (error) {
        if(error.message === 'Unexpected end of JSON input'){
            return NextResponse.json({error_message:'Payload is missing!'},{status:400})
           }
            return NextResponse.json({error_message:error.message},{status:400})
    }
    

}
