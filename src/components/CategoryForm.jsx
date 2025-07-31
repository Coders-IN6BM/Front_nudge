import React, { useState } from 'react';
import { createCategory } from '../services/api.jsx';
import styles from './CategoryForm.module.css';

const CategoryForm = ({ onCategoryCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await createCategory(formData);
      
      if (response.success) {
        setSuccess(response.message || 'Categoría creada exitosamente');
        // Limpiar formulario
        setFormData({
          name: '',
          description: ''
        });
        
        // Notificar al componente padre si se proporciona callback
        if (onCategoryCreated) {
          onCategoryCreated(response.category);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al crear la categoría';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Crear Nueva Categoría</h2>
          {onCancel && (
            <button 
              className={styles.closeBtn} 
              onClick={onCancel}
              type="button"
            >
              ✕
            </button>
          )}
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <span>{error}</span>
            <button onClick={clearMessages} className={styles.closeBtn}>×</button>
          </div>
        )}

        {success && (
          <div className={styles.successMessage}>
            <span>{success}</span>
            <button onClick={clearMessages} className={styles.closeBtn}>×</button>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Nombre de la categoría *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ej: Tecnología, Salud, Educación..."
              maxLength="50"
              required
            />
            <small className={styles.charCount}>
              {formData.name.length}/50 caracteres
            </small>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Descripción opcional de la categoría..."
              maxLength="200"
              rows="4"
            />
            <small className={styles.charCount}>
              {formData.description.length}/200 caracteres
            </small>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || !formData.name.trim()}
            >
              {loading ? 'Creando...' : 'Crear Categoría'}
            </button>
            
            {onCancel && (
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onCancel}
                disabled={loading}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
