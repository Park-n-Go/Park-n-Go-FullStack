
import { getCompanies } from "@/Controller/Company/CRUD";
import { dbConnect } from "@/Utils/connectDB";

import { NextResponse } from 'next/server'

export async function GET(req) {
    try {
        
        const searchParams = req.nextUrl.searchParams
        const count = searchParams.get('count')
        const skip = searchParams.get('skip')
        const select = searchParams.get('$select')

        
        await dbConnect()
    
    const res = await getCompanies({query:{count,skip,select}})
    
    return NextResponse.json(res.body,res.status)
    } catch (error) {
       
            return NextResponse.json({error_message:error.message},{status:400})
    }
   


}
