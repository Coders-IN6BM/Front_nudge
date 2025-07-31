import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../services';

export const useProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    userName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Cargar perfil inicial
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserProfile();
        
        if (data.success && data.user) {
          setProfile({
            name: data.user.name || "",
            surname: data.user.surname || "",
            userName: data.user.userName || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el perfil');
        console.error('Error cargando perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Actualizar campo del perfil
  const updateField = (name, value) => {
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
    setSuccess(false);
  };

  // Guardar perfil
  const saveProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Validaciones básicas
      if (!profile.name.trim()) {
        throw new Error('El nombre es requerido');
      }
      if (!profile.surname.trim()) {
        throw new Error('El apellido es requerido');
      }
      if (!profile.email.trim()) {
        throw new Error('El email es requerido');
      }
      if (!profile.userName.trim()) {
        throw new Error('El nombre de usuario es requerido');
      }
      if (!profile.phone.trim()) {
        throw new Error('El teléfono es requerido');
      }
      if (profile.phone.length !== 8) {
        throw new Error('El teléfono debe tener exactamente 8 dígitos');
      }

      const response = await updateUserProfile(profile);
      
      if (response.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error al guardar el perfil';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Limpiar mensajes
  const clearMessages = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    profile,
    loading,
    error,
    success,
    updateField,
    saveProfile,
    clearMessages
  };
};