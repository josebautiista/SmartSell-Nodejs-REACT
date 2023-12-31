/* eslint-disable react/prop-types */
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        username,
        password,
      });
      const token = response.data.token;
      console.log("Inicio de sesión exitoso");
      console.log(response);
      handleSnackbarOpen(response.data.message, "success");
      localStorage.setItem("token", token);
      setTimeout(() => {
        location.reload();
      }, 500);
    } catch (error) {
      handleSnackbarOpen(
        JSON.parse(error.request.responseText).message,
        "error"
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Usuario"
                variant="outlined"
                size="small"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                variant="outlined"
                size="small"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Iniciar Sesión
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
