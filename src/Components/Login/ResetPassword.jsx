import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthService from "../../Service/AuthService";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import "../../Styles/Login/login.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    if (!email || !password || !passwordConfirmation) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      await AuthService.resetPassword({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMsg("Contraseña restablecida correctamente. Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("No se pudo restablecer la contraseña. Verifica los datos.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <Typography variant="h5" className="login-header" style={{ marginBottom: 16 }}>
        Restablecer contraseña
      </Typography>
      <Paper elevation={3} className="login-paper">
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nueva contraseña"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirmar contraseña"
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
            style={{ marginTop: 16 }}
          >
            Restablecer
          </Button>
          {msg && <Typography color="success.main" style={{ marginTop: 16 }}>{msg}</Typography>}
          {error && <Typography color="error" style={{ marginTop: 16 }}>{error}</Typography>}
        </form>
      </Paper>
    </Container>
  );
}