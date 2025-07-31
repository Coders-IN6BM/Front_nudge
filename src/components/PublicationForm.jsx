import React, { useState } from 'react';
import { createPublication } from '../services/api.jsx';
import CategorySelector from './CategorySelector.jsx';
import CategoryForm from './CategoryForm.jsx';
import styles from './PublicationForm.module.css';

const PublicationForm = ({ onPublicationCreated, onCancel, editMode = false, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    publicationContent: initialData?.publicationContent || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar mensajes al escribir
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleCategoryChange = (categoryId, categoryObj) => {
    setFormData(prev => ({
      ...prev,
      category: categoryId
    }));
    // Limpiar mensajes
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validaciones frontend
    if (!formData.title.trim()) {
      setError('El título es obligatorio');
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError('Debes seleccionar una categoría');
      setLoading(false);
      return;
    }

    if (!formData.publicationContent.trim()) {
      setError('El contenido es obligatorio');
      setLoading(false);
      return;
    }

    try {
      const response = await createPublication(formData);
      
      if (response.success) {
        setSuccess(response.message || 'Publicación creada exitosamente');
        
        // Limpiar formulario
        setFormData({
          title: '',
          category: '',
          publicationContent: ''
        });
        
        // Notificar al componente padre
        if (onPublicationCreated) {
          onPublicationCreated(response.publication);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al crear la publicación';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleCategoryCreated = (newCategory) => {
    // Actualizar la categoría seleccionada con la nueva
    setFormData(prev => ({
      ...prev,
      category: newCategory.uid
    }));
    setShowCategoryForm(false);
    setSuccess('Categoría creada exitosamente. Ya puedes usarla en tu publicación.');
  };

  // Si está mostrando el formulario de categorías
  if (showCategoryForm) {
    return (
      <CategoryForm
        onCategoryCreated={handleCategoryCreated}
        onCancel={() => setShowCategoryForm(false)}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>{editMode ? 'Editar Publicación' : 'Crear Nueva Publicación'}</h2>
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
          {/* Título */}
          <div className={styles.inputGroup}>
            <label htmlFor="title" className={styles.label}>
              Título de la publicación *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              placeholder="Escribe un título atractivo..."
              maxLength="64"
              required
            />
            <small className={styles.charCount}>
              {formData.title.length}/64 caracteres
            </small>
          </div>

          {/* Selector de categoría */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Categoría *
            </label>
            <CategorySelector
              selectedCategory={formData.category}
              onCategoryChange={handleCategoryChange}
              placeholder="Selecciona una categoría"
              required={true}
              showCreateOption={true}
              onCreateCategory={() => setShowCategoryForm(true)}
            />
          </div>

          {/* Contenido */}
          <div className={styles.inputGroup}>
            <label htmlFor="publicationContent" className={styles.label}>
              Contenido de la publicación *
            </label>
            <textarea
              id="publicationContent"
              name="publicationContent"
              value={formData.publicationContent}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Escribe el contenido de tu publicación..."
              rows="8"
              required
            />
            <small className={styles.charCount}>
              {formData.publicationContent.length} caracteres
            </small>
          </div>

          {/* Botones */}
          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || !formData.title.trim() || !formData.category || !formData.publicationContent.trim()}
            >
              {loading ? 'Publicando...' : editMode ? 'Actualizar Publicación' : 'Crear Publicación'}
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

        {/* Info adicional */}
        <div className={styles.infoSection}>
          <div className={styles.tips}>
            <h4>💡 Consejos para una buena publicación:</h4>
            <ul>
              <li>Usa un título claro y descriptivo</li>
              <li>Selecciona la categoría más apropiada</li>
              <li>Escribe contenido útil y bien estructurado</li>
              <li>Revisa la ortografía antes de publicar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationForm;
