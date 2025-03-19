import React, { useState } from 'react';
import axiosClient from '../axiosClient'; // Asegúrate de que la configuración de Axios esté correcta
import Styles from '../css/Login.module.css';
import Logo from '../assets/Logo.webp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await axiosClient.post(
        'wp-json/jwt-auth/v1/token',
         // No se envían datos en el cuerpo
        {
          params: {
            email, // WordPress permite autenticación con email o username
            password,
            AUTH_CODE: "teamkey",

          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Guardar el token
      localStorage.setItem('authToken', response.data.data.jwt);
      console.log('Login successful');
      setLoading(false);
  
      // Redirigir si es necesario
      // window.location.href = "/dashboard";
    } catch (err) {
      setLoading(false);
      setError('Error al iniciar sesión: ' + (err.response?.data?.message || err.message));
    }
  };
  

  return (
    <div className={Styles.container}>
      <img
        src={Logo}
        alt="Logo Remax"
        title="Remax"
        width={80}
        height={50}
        className={Styles.logo}
      />
      <form onSubmit={handleLogin} className={Styles.form}>
        <input
          type="email"
          placeholder="Digita tu correo"
          className={Styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={Styles.input}
          placeholder="Digita tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={Styles.button}
          aria-label="Iniciar Sesión"
        >
          {loading ? 'Loggeando...' : 'Acceder'}
        </button>
      </form>
      {error && <p className={Styles.error}>{error}</p>}
    </div>
  );
};

export default Login;
