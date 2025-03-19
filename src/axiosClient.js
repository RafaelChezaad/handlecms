import axios from 'axios';

// Crear una instancia de Axios
const axiosClient = axios.create({
  baseURL: 'https://teamelizabethmartinez.com/', // URL base de la API REST de WordPress
});

// Interceptor para agregar el token JWT en las cabeceras de cada solicitud
axiosClient.interceptors.request.use(
  (config) => {
    // Obtenemos el token JWT del localStorage
    const token = localStorage.getItem("authToken");

    // Si hay un token, lo agregamos a la cabecera Authorization
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globalmente
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token es inválido o expira, puedes redirigir al login
      console.error("Token inválido o expirado.");
      // Aquí puedes agregar lógica para redirigir al login o eliminar el token
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
