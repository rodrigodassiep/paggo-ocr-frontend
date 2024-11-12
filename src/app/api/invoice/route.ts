export const maxDuration = 60;
import { NextResponse } from 'next/server';



export async function POST(request : Request) {
  try {
    const data = await request.json();
    const response = await fetch(process.env.BACKEND_API_URI + '/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${data.token}`,
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ image: data.file }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload the image to external server');
    }
    
    return NextResponse.json({ message: 'Image uploaded successfully' , text: (await response.json()).text });
  } catch (error : any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
