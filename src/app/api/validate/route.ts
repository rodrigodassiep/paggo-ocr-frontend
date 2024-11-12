export const maxDuration = 60;
import { NextResponse } from 'next/server';



export async function POST(request : Request) {
  try {
    const data = await request.json();
    const response = await fetch(process.env.BACKEND_API_URI + '/users/validate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${data.token}`,
        'Content-Type': "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to validate user');
    }
    return NextResponse.json({ message: 'Validated successfully'});
  } catch (error : any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
