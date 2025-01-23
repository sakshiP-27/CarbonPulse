import { TextField, Button } from "@mui/material";

export const SignupBox = () => {
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
        />
      </div>

      <div className="w-full mb-2">
        <TextField
          id="outlined-username-input"
          label="Username"
          variant="outlined"
          className="w-full"
        />
      </div>

      <div className="w-full mb-2">
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="new-password"
          className="w-full"
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

      <Button
        variant="contained"
        className="w-2/4"
        style={{ backgroundColor: "#b0b0b0", color: "white" }}
      >
        Signup
      </Button>

      <a href="/login" className="mt-4 text-slate-700 hover:underline">
        Already have an account?
      </a>
    </div>
  );
};
