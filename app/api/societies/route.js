
import { getSocieties } from "@/Controller/Society/CRUD";
import { dbConnect } from "@/Utils/connectDB";
import { NextResponse } from 'next/server'

export async function GET() {
    
    await dbConnect()

const res = await getSocieties()

return NextResponse.json(res.body,res.status)


}
