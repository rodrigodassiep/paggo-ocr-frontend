'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Authenticated: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const router = useRouter();


    useEffect(() => {
        async function validate() {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/login');
            } else {

                const response = await fetch('api/validate', {
                    method: 'POST',
                    body: JSON.stringify({ token : token })
                });

                if (!response.ok) {
                    router.push('/login');
                    setAuthenticated(false);
                }
                setAuthenticated(true);
            }
        }
        validate();
    }, []);

    if (authenticated === false) return <></>;
    else return <>{children}</>;

};

export default Authenticated;
