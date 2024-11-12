export const maxDuration = 60;
import { NextResponse } from 'next/server';



export async function POST(request : Request) {
  try {
    const data = await request.json();
    const response = await fetch(process.env.BACKEND_API_URI + '/invoices', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${data.token}`,
        'Content-Type': "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch results');
    }
    return NextResponse.json({ message: 'Fetched successfully' , results: (await response.json())});
  } catch (error : any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
