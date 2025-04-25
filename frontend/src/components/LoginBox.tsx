import { TextField, Button } from "@mui/material";
import { useState } from "react";

interface LoginBoxProps {
    loading: boolean;
    error: string;
    onLogin: (userData: { username: string; password: string }) => void;
}

export const LoginBox = ({ loading, error, onLogin }: LoginBoxProps) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(formData);
    };

    return (
        <div className="w-80 bg-white shadow-2xl rounded-xl p-6 flex flex-col items-center">
            <img
                src="/src/assets/logos/CP_Logo_Final.png"
                alt="CarbonPulse Logo"
                height={100}
                width={100}
                className="mb-4"
            />
            <span className="text-2xl font-coustard font-bold mb-4">Login</span>

            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full mb-2">
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        className="w-full"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="w-full mb-4">
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        className="w-full"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                {error && (
                    <div className="text-red-500 mb-4 text-sm">{error}</div>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    className="w-2/4"
                    style={{ backgroundColor: "#b0b0b0", color: "white" }}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>

            <a href="/signup" className="mt-4 text-slate-700 hover:underline">
                Sign Up
            </a>
        </div>
    );
};