import { headers } from "next/headers";
import { NextRequest } from "next/server";
import {OpenAI} from "openai";

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

async function POST(req:NextRequest){
const { imgpromt} = await req.json();

if(!imgpromt){ 
return new Response('Please provide a prompt', {status:400})
} 

try {

const response = await openai.images.generate({
 model : "dall-e-2",
 prompt: imgpromt,
 size: "1024x1024",
 n:1
});
if (! response.data) {
 throw new Error("An error occured while generating the image")
} 
return  new Response(JSON.stringify({data: response.data}), {
 status: 200,
    headers: {
     "Content-Type": "application/json"
    }
})
    
} catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: " An error occured while generating the image"}) , {
        status: 500 ,
        headers: {
            "Content-Type": "application/json"
        }
    })

}

}