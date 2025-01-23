import { TextField, Button } from "@mui/material";

export const LoginBox = () => {
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

      <div className="w-full mb-2">
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          className="w-full"
        />
      </div>

      <div className="w-full mb-4">
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          className="w-full"
        />
      </div>

      <Button
        variant="contained"
        className="w-2/4"
        // background color should be gray
        style={{ backgroundColor: "#b0b0b0", color: "white" }}
      >
        Login
      </Button>

      <a href="/sign-in" className="mt-4 text-slate-700 hover:underline">
        Sign In
      </a>
    </div>
  );
};