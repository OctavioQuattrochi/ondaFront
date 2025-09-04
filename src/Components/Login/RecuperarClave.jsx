import React, { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import AuthService from "../../Service/AuthService";
import "../../Styles/Login/login.css";

export default function RecuperarClave() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      await AuthService.recuperarClave(email); // Debes implementar este método
      setMsg("Si el correo existe, recibirás instrucciones para restablecer tu contraseña.");
    } catch {
      setError("No se pudo enviar el correo. Intenta nuevamente.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <Typography variant="h5" className="login-header" style={{ marginBottom: 16 }}>
        Recuperar contraseña
      </Typography>
      <Paper elevation={3} className="login-paper">
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
            style={{ marginTop: 16 }}
          >
            Enviar instrucciones
          </Button>
          {msg && <Typography color="success.main" style={{ marginTop: 16 }}>{msg}</Typography>}
          {error && <Typography color="error" style={{ marginTop: 16 }}>{error}</Typography>}
        </form>
      </Paper>
    </Container>
  );
}