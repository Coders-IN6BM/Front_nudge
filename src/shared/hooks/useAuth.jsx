import { useState, useEffect, createContext, useContext } from 'react';
import { loginUser, registerUser, getUserProfile } from '../../services';

// Context para compartir estado de autenticación
const AuthContext = createContext();

// Hook para usar el contexto de autenticación
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  }
  return context;
};

// Provider del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay token al cargar la app
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getUserProfile();
          if (response.success && response.user) {
            setUser(response.user);
            setIsAuthenticated(true);
          } else {
            // Token inválido, limpiar
            localStorage.removeItem('token');
          }
        } catch (error) {
          // Token expirado o inválido
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
      }
      throw new Error(response.message || 'Error en login');
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      if (response.success && response.user) {
        // Opcionalmente hacer login automático después del registro
        return response;
      }
      throw new Error(response.message || 'Error en registro');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook principal para autenticación
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Para login
  const login = async (credentials) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validaciones básicas
      if (!credentials.email && !credentials.userName) {
        throw new Error('Email o nombre de usuario es requerido');
      }
      if (!credentials.password) {
        throw new Error('La contraseña es requerida');
      }

      const response = await loginUser(credentials);
      
      if (response.success) {
        setSuccess('Login exitoso');
        return response;
      }
      
      throw new Error(response.message || 'Error en login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error de login';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Para registro
  const register = async (userData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validaciones básicas
      if (!userData.name?.trim()) {
        throw new Error('El nombre es requerido');
      }
      if (!userData.surname?.trim()) {
        throw new Error('El apellido es requerido');
      }
      if (!userData.userName?.trim()) {
        throw new Error('El nombre de usuario es requerido');
      }
      if (!userData.email?.trim()) {
        throw new Error('El email es requerido');
      }
      if (!userData.password?.trim()) {
        throw new Error('La contraseña es requerida');
      }
      if (userData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      if (!userData.phone?.trim()) {
        throw new Error('El teléfono es requerido');
      }
      if (userData.phone.length !== 8) {
        throw new Error('El teléfono debe tener exactamente 8 dígitos');
      }

      const response = await registerUser(userData);
      
      if (response.success) {
        setSuccess('Usuario registrado exitosamente');
        return response;
      }
      
      throw new Error(response.message || 'Error en registro');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error de registro';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Limpiar mensajes
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return {
    login,
    register,
    loading,
    error,
    success,
    clearMessages
  };
};