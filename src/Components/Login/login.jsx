import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/Login/login.css';
import AuthService from '../../Service/AuthService';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsLogged } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Por favor ingresá un correo válido.';
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'La clave debe tener al menos 6 caracteres.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setLoading(true);
      try {
        await AuthService.login(email, password);
        setIsLogged(true);
        navigate("/");
      } catch (err) {
        setErrors({ ...newErrors, password: 'Credenciales incorrectas.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="login-container">
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
            disabled={loading}
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
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
            disabled={loading}
            style={{ position: "relative" }}
          >
            {loading ? <CircularProgress size={24} color="primary" /> : "Ingresar"}
          </Button>
          {loading && (
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: 16, color: "#888" }}
            >
              Iniciando sesión...
            </Typography>
          )}

          <Typography variant="body2" align="center" className="create-account-link">
            <Link to="/register" className="link">
              Crear cuenta
            </Link>
          </Typography>

          <Typography variant="body2" align="right" className="forgot-password-link" style={{ marginTop: 8 }}>
            <Link to="/recuperar-clave" className="link">
              ¿Olvidaste tu contraseña?
            </Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}
