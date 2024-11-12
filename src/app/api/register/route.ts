export const maxDuration = 60;
export async function POST(req: Request) {

    const { email, password , name} = await req.json();

    if (!email || !password) {
        return Response.json({ message: 'Username and password are required' });
    }

    fetch(process.env.BACKEND_API_URI + '/users', {
        method: 'POST',
        body: JSON.stringify({ email, password, name}),
        headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            if (response.ok) {
                return Response.json({ message: 'User registered successfully' });
            }
            else {
                return Response.json({ message: 'Error registering user' });
            }
        });

    return Response.json({ message: 'Error registering user' });
}