export const maxDuration = 60;
export async function POST(req: Request) {

    const { email, password } = await req.json();

    if (!email || !password) {
        return Response.json({ message: 'Email and password are required' });
    }
    try {
        const response = await fetch(process.env.BACKEND_API_URI + '/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            const token = (await response.json()).accessToken;
            return Response.json({ message: 'User logged successfully', token});
        }
        else {
            return Response.json({ message: 'Error logging user' });
        }
    } catch (error) {
        return Response.json({ message: 'Error logging user' });
    }
}