
import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({error_message:'SocietyID is missing in enpoint URL',example:'http://{BASE_URI}/api/society/{societyID}'},{status:400})

}
