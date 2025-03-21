import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/Logo.jpg";
import Style from "../css/Login.module.css";
import { useNavigate } from "react-router-dom";
// import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

function Login() {
  const ApiUrl ='https://teamelizabethmartinez.com/?rest_route=/simple-jwt-login/v1/auth';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    AUTH_KEY: "teamkey",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Por favor ingresa un correo electrónico.";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Por favor ingresa una contraseña.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(`${ApiUrl}`, formData);
      const token = response.data.data.jwt;

      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrors({
        email: "Las credenciales ingresadas son incorrectas.",
        password: "Las credenciales ingresadas son incorrectas.",
      });
    }
  };

  return (
    <div className={Style.container}>
      <div className="inner-container">
       
        <img className={Style.logo} src={Logo} alt="Logo del remax"  />
        <form onSubmit={handleSubmit} className={Style.form}>
              <input
                type="email"
                id="email-address"
                name="email"
                required
                className={Style.input}
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
          
              <input
                type="password"
                id="password"
                name="password"
                required
                className={Style.input}
                
                placeholder="************"
                value={formData.password}
                onChange={handleChange}
              />   
         
            <button type="submit" className={Style.button}>
              Iniciar sesión
            </button>
            <div className="flex justify-center">
              {loading && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                </div>
              )}
            </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;