import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileEdit.module.css";
import { useProfile } from "../../shared/hooks/useProfile.jsx";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const {
    profile,
    loading,
    error,
    success,
    updateField,
    saveProfile,
    clearMessages
  } = useProfile();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveProfile();
    } catch (error) {
      // El error ya se maneja en el hook
      console.error('Error al guardar:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.leftColumn}>
          <h2 className={styles.header}>Editar Perfil</h2>
          
          {/* Mensajes de estado */}
          {error && (
            <div className={styles.errorMessage}>
              {error}
              <button onClick={clearMessages} className={styles.closeBtn}>×</button>
            </div>
          )}
          {success && (
            <div className={styles.successMessage}>
              ¡Perfil actualizado exitosamente!
            </div>
          )}
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>Nombre</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Nombre"
              value={profile.name}
              onChange={handleChange}
              required
            />
            
            <label className={styles.label}>Apellido</label>
            <input
              className={styles.input}
              type="text"
              name="surname"
              placeholder="Apellido"
              value={profile.surname}
              onChange={handleChange}
              required
            />
            
            <label className={styles.label}>Nombre de usuario</label>
            <input
              className={styles.input}
              type="text"
              name="userName"
              placeholder="Nombre de usuario"
              value={profile.userName}
              onChange={handleChange}
              required
            />
            
            <label className={styles.label}>Correo electrónico</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={profile.email}
              onChange={handleChange}
              required
            />
            
            <label className={styles.label}>Teléfono (8 dígitos)</label>
            <input
              className={styles.input}
              type="tel"
              name="phone"
              placeholder="12345678"
              value={profile.phone}
              onChange={handleChange}
              maxLength="8"
              pattern="[0-9]{8}"
              required
            />
            
            <button 
              className={styles.saveBtn} 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
            
            <button 
              className={styles.backBtn} 
              type="button"
              onClick={() => navigate('/')}
            >
              Volver al inicio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;