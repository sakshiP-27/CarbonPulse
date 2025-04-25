import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { SignupBox } from "../components/SignupBox"

export const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (userData: { username: string, email: string, password: string }) => {
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }
            
            setSuccess(true);
            // Redirect to login after successful signup
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // You could add any initialization logic here if needed
        return () => {
            // Cleanup if needed
        };
    }, []);

    return <div className="bg-[url(/src/assets/imgs/logging-bg.jpg)] h-screen flex justify-center items-center">
        <SignupBox loading={loading} error={error} success={success} onSignup={handleSignup}/>
    </div>
}