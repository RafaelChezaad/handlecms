import React, { useState } from 'react';
import axiosClient from '../axiosClient'; // Asegúrate de que la configuración de Axios esté correcta
import Styles from '../css/Login.module.css';
import Logo from '../assets/Logo.webp';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia el estado de carga
    setError(null); // Reseteamos los posibles errores previos

    try {
      const response = await axiosClient.post('/jwt-auth/v1/token', {
        username,
        password,
      });

      // Si la autenticación es exitosa, guardamos el token en el localStorage
      localStorage.setItem('authToken', response.data.token);
      console.log('Login successful');
      setLoading(false);

      // Aquí puedes redirigir al dashboard o página principal, si lo deseas
      // window.location.href = "/dashboard"; // Si deseas redirigir programáticamente
    } catch (err) {
      setLoading(false);
      setError('Error al iniciar sesión: ' + err.message);
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
          type="text"
          placeholder="Digita tu correo"
          className={Styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
