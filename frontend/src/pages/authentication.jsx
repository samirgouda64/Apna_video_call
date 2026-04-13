import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [name, setName] = React.useState();
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();

  const [formState, setFormState] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
        setMessage(result.message);
        setError("");
        setOpen(true);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);

        setMessage(result);
        setUsername("");
        setPassword("");
        setError("");
        setOpen(true);
        setFormState(0);

        setTimeout(() => {
          setOpen(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        {/* LEFT SIDE IMAGE*/}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            position: "relative",
            overflow: "hidden",
            backgroundImage: "url(https://picsum.photos/1040/900)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* DARK OVERLAY */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.85), rgba(99,102,241,0.4))",
            }}
          />

          {/* BLUR GLOW CIRCLES */}
          <Box
            sx={{
              position: "absolute",
              width: 300,
              height: 300,
              background: "rgba(99,102,241,0.4)",
              filter: "blur(120px)",
              top: "20%",
              left: "15%",
              borderRadius: "50%",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 250,
              height: 250,
              background: "rgba(168,85,247,0.4)",
              filter: "blur(120px)",
              bottom: "15%",
              right: "10%",
              borderRadius: "50%",
            }}
          />

          {/* CENTER CONTENT */}
          <Box
            sx={{
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
              px: 4,
            }}
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
              Welcome ApnaVideoCall
            </h1>

            <p style={{ fontSize: "1rem", opacity: 0.85, maxWidth: 320 }}>
              Connect instantly with friends, colleagues, and teams through
              secure, high-quality video calls. Fast, reliable, and built for
              real-time communication.
            </p>
          </Box>
        </Grid>

        {/* RIGHT SIDE FORM */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg,#0f172a,#1e293b)",
          }}
        >
          <Box
            sx={{
              width: "85%",
              maxWidth: 420,
              p: 4,
              borderRadius: 4,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              color: "white",
            }}
          >
            {/* ICON */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#6366f1",
                  width: 56,
                  height: 56,
                  boxShadow: "0 0 15px rgba(99,102,241,0.6)",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
            </Box>

            {/* TITLE */}
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              {formState === 0 ? "Welcome Back 👋" : "Create Account 🚀"}
            </h2>

            {/* TOGGLE BUTTONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                mb: 2,
                background: "rgba(255,255,255,0.1)",
                padding: "6px",
                borderRadius: "12px",
              }}
            >
              <Button
                onClick={() => setFormState(0)}
                variant={formState === 0 ? "contained" : "text"}
                sx={{
                  flex: 1,
                  borderRadius: "10px",
                  color: "white",
                  background:
                    formState === 0
                      ? "linear-gradient(90deg,#6366f1,#8b5cf6)"
                      : "transparent",
                }}
              >
                Sign In
              </Button>

              <Button
                onClick={() => setFormState(1)}
                variant={formState === 1 ? "contained" : "text"}
                sx={{
                  flex: 1,
                  borderRadius: "10px",
                  color: "white",
                  background:
                    formState === 1
                      ? "linear-gradient(90deg,#6366f1,#8b5cf6)"
                      : "transparent",
                }}
              >
                Sign Up
              </Button>
            </Box>

            {/* FORM */}
            <Box component="form" noValidate>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.7)" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                      "&:hover fieldset": { borderColor: "#6366f1" },
                    },
                  }}
                />
              )}

              <TextField
                margin="normal"
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  input: { color: "white" },
                  label: { color: "rgba(255,255,255,0.7)" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "#6366f1" },
                  },
                }}
              />

              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  input: { color: "white" },
                  label: { color: "rgba(255,255,255,0.7)" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                    "&:hover fieldset": { borderColor: "#6366f1" },
                  },
                }}
              />

              {/* ERROR */}
              <p style={{ color: "#ff4d4d", textAlign: "center" }}>{error}</p>

              {/* SUBMIT BUTTON */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleAuth}
                sx={{
                  mt: 2,
                  py: 1.3,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* SNACKBAR */}
      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}
