import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth.jsx';
import styles from './login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, loading, error, success, clearMessages } = useAuth();

  // Estados para login
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Estados para registro
  const [registerData, setRegisterData] = useState({
    name: '',
    surname: '',
    userName: '',
    email: '',
    password: '',
    phone: ''
  });

  // Manejar cambios en formulario de login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    clearMessages();
  };

  // Manejar cambios en formulario de registro
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    clearMessages();
  };

  // Submit de login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(loginData);
      if (result && result.success) {
        // Redirigir al dashboard después del login exitoso
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  // Submit de registro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(registerData);
      if (result && result.success) {
        // Después del registro exitoso, cambiar a login
        setIsLogin(true);
        setRegisterData({
          name: '',
          surname: '',
          userName: '',
          email: '',
          password: '',
          phone: ''
        });
      }
    } catch (error) {
      console.error('Error en registro:', error);
    }
  };

  // Cambiar entre login y registro
  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearMessages();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
        </div>

        {/* Mensajes de estado */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
            <button onClick={clearMessages} className={styles.closeBtn}>×</button>
          </div>
        )}
        {success && (
          <div className={styles.successMessage}>
            {success}
          </div>
        )}

        {/* Formulario de Login */}
        {isLogin ? (
          <form className={styles.form} onSubmit={handleLoginSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email o nombre de usuario</label>
              <input
                className={styles.input}
                type="text"
                name="email"
                placeholder="Email o nombre de usuario"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Contraseña</label>
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="Contraseña"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <button 
              className={styles.submitBtn} 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>
        ) : (
          /* Formulario de Registro */
          <form className={styles.form} onSubmit={handleRegisterSubmit}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nombre</label>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Apellido</label>
                <input
                  className={styles.input}
                  type="text"
                  name="surname"
                  placeholder="Apellido"
                  value={registerData.surname}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombre de usuario</label>
              <input
                className={styles.input}
                type="text"
                name="userName"
                placeholder="Nombre de usuario"
                value={registerData.userName}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Contraseña</label>
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="Contraseña (mínimo 6 caracteres)"
                value={registerData.password}
                onChange={handleRegisterChange}
                minLength="6"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Teléfono</label>
              <input
                className={styles.input}
                type="tel"
                name="phone"
                placeholder="12345678"
                value={registerData.phone}
                onChange={handleRegisterChange}
                maxLength="8"
                pattern="[0-9]{8}"
                required
              />
            </div>

            <button 
              className={styles.submitBtn} 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>
        )}

        {/* Toggle entre login y registro */}
        <div className={styles.toggleSection}>
          <p className={styles.toggleText}>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button 
              className={styles.toggleBtn}
              onClick={toggleMode}
              type="button"
            >
              {isLogin ? 'Regístrate' : 'Inicia Sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;