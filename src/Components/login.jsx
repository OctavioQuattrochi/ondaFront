import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import '../Styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log('Logged in with', { email, password });
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      {/* Nuevo título con estilos personalizados */}
      <Typography variant="h4" className="login-header">
        Ingresar en <br />
        <span className="login-header-onda">Onda estudio</span>
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
            onChange={(e) => setEmail(e.target.value)}
            helperText={errors.email}
            error={!!errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Clave"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={errors.password}
            error={!!errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
          >
            Ingresar
          </Button>

        </form>
      </Paper>
    </Container>
  );
}
