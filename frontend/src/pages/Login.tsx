import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginBox } from "../components/LoginBox"

export const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (userData: { username: string, password: string }) => {
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            
            // Store the token in localStorage
            localStorage.setItem('token', data.token);
            
            // Redirect to dashboard after successful login
            navigate('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return <div className="bg-[url(/src/assets/imgs/logging-bg.jpg)] h-screen flex justify-center items-center">
        <LoginBox loading={loading} error={error} onLogin={handleLogin} />
    </div>
}