import { Webhook } from "svix";
import { headers } from "next/headers";
import {dbConnect} from "@/Utils/connectDB";
import { createUser, updateUser } from "@/Controller/UserCRUD";


export async function POST(req){
const WEBHOOK_SECRET=process.env.CLERK_WEBHOOK_SECRET

if(!WEBHOOK_SECRET){
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .evn or .env.local')
}

const headersPayload = headers();
const svix_id = headersPayload.get("svix-id");
const svix_timestamp = headersPayload.get("svix-timestamp");
const svix_signature = headersPayload.get("svix-signature");

if(!svix_id || !svix_timestamp || !svix_signature){
    return new Response('Error occured -- no svix headers',{status:400})
}

const payload = await req.json()
const body = JSON.stringify(payload)
const wh = new Webhook(WEBHOOK_SECRET)
let evt
try {
    evt = wh.verify(body,{
"svix-id": svix_id,"svix-timestamp":svix_timestamp, "svix-signature": svix_signature

    })
    
} catch (error) {
    console.error('Error verifying webhook: ',error)
    return new Response('Error occured',{status:400})
}

const userData = evt.data;
const eventType = evt.type
if(eventType == "user.created")
{
   await dbConnect()
    
   const res= await createUser({body:{...userData,source:"clerk"}})
   
   return new Response(res.body,res.status)
   
    
}
if(eventType == "user.updated")
{
   await dbConnect()
   const res = await updateUser({body:userData})
   console.log(res)
   return new Response(res.body,res.status)
   
    
}

return new Response('',{status:200})

}
