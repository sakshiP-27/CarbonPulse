import { TextField, Button } from "@mui/material";
import { useState } from 'react';

interface SignupBoxProps {
  loading: boolean;
  error: string;
  success: boolean;
  onSignup: (userData: { username: string, email: string, password: string }) => void;
}

export const SignupBox = ({ loading, error, success, onSignup }: SignupBoxProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-80 bg-white shadow-2xl rounded-xl p-6 flex flex-col items-center">
      <img
        src="/src/assets/logos/CP_Logo_Final.png"
        alt="CarbonPulse Logo"
        height={100}
        width={100}
        className="mb-4"
      />
      <span className="text-2xl font-coustard font-bold mb-4">Signup</span>

      <div className="w-full mb-2">
        <TextField
          id="outlined-mail-input"
          label="Mail"
          variant="outlined"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="w-full mb-2">
        <TextField
          id="outlined-username-input"
          label="Username"
          variant="outlined"
          className="w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="w-full mb-2">
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="new-password"
          className="w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="w-full mb-4">
        <TextField
          id="outlined-confirm-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          className="w-full"
        />
      </div>

      {success && <div className="text-green-500 mb-2">Signup successful! Redirecting...</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <Button
        variant="contained"
        className="w-2/4"
        style={{ backgroundColor: "#4CAF50", color: "white" }}
        disabled={loading}
        onClick={() => onSignup({ username, email, password })}
      >
        {loading ? "Signing up..." : "Signup"}
      </Button>

      <a href="/login" className="mt-4 text-slate-700 hover:underline">
        Already have an account?
      </a>
    </div>
  );
};
