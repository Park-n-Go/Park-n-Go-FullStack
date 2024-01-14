
import { getSocieties, getSocietyByID } from "@/Controller/Society/CRUD";
import { dbConnect } from "@/Utils/connectDB";

import { NextResponse } from 'next/server'

export async function GET(req,context) {
    try {
       const {params}=context
       if(!params)
    {
     
        return NextResponse.json({error_message:"Society ID is missing in Request URL !!!"}, {status:400})
      
    }
        
        await dbConnect()
    
    const res = await getSocietyByID({params})
    
    return NextResponse.json(res.body,res.status)
    } catch (error) {
       
            return NextResponse.json({error_message:error.message},{status:400})
    }
   


}
