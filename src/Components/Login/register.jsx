import React from 'react';
import '../../Styles/Login/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones si querés hacer alguna
    // Después de la lógica de validación, redirige:
    navigate('/addressform');
  };

  return (
    <div className="register-page">
      <h1 className="register-title">Crea tu cuenta</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Apellido</label>
          <input type="text" id="lastname" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="ondaestudio@email.com"
            required
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
            />
            <span className="eye-icon">👁️</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <div className="password-wrapper">
            <input
              type="password"
              id="confirm-password"
              className="register-input"
              placeholder="Password"
              required
            />
            <span className="eye-icon">👁️</span>
          </div>
        </div>

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
