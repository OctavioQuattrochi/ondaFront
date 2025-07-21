import React, { useState } from 'react';
import '../../Styles/Login/register.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Service/AuthService';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await AuthService.register(
        form.name,
        form.email,
        form.password,
        form.lastname,
        form.confirmPassword
      );
      navigate('/addressform');
    } catch (err) {
      setError('Error al registrar. Intenta nuevamente.');
    }
  };

  return (
    <div className="register-page">
      <h1 className="register-title">Crea tu cuenta</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" className="form-input" required value={form.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Apellido</label>
          <input type="text" id="lastname" className="form-input" required value={form.lastname} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="ondaestudio@email.com"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="password-wrapper">
            <input
              type="password"
              id="password"
              className="register-input"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
            />
            <span className="eye-icon">👁️</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <div className="password-wrapper">
            <input
              type="password"
              id="confirmPassword"
              className="register-input"
              placeholder="Password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <span className="eye-icon">👁️</span>
          </div>
        </div>

        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

        <div className="form-button-wrapper">
          <button type="submit" className="register-button">
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
