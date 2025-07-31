import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/api.jsx';
import styles from './CategorySelector.module.css';

const CategorySelector = ({ 
  selectedCategory, 
  onCategoryChange, 
  placeholder = "Selecciona una categoría",
  disabled = false,
  required = false,
  showCreateOption = false,
  onCreateCategory = null
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getCategories();
      
      if (response.success && response.categories) {
        setCategories(response.categories);
      } else {
        setError('No se pudieron cargar las categorías');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al cargar categorías';
      setError(errorMessage);
      console.error('Error cargando categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    
    if (value === 'CREATE_NEW' && onCreateCategory) {
      onCreateCategory();
      return;
    }
    
    if (onCategoryChange) {
      const selectedCat = categories.find(cat => cat.uid === value);
      onCategoryChange(value, selectedCat);
    }
  };

  const refreshCategories = () => {
    loadCategories();
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <span>Cargando categorías...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <span>{error}</span>
          <button 
            className={styles.retryBtn}
            onClick={refreshCategories}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <select
        value={selectedCategory || ''}
        onChange={handleSelectChange}
        className={styles.select}
        disabled={disabled}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        
        {categories.map((category) => (
          <option 
            key={category.uid} 
            value={category.uid}
            title={category.description}
          >
            {category.name}
            {category.description && ` - ${category.description.substring(0, 50)}${category.description.length > 50 ? '...' : ''}`}
          </option>
        ))}
        
        {showCreateOption && onCreateCategory && (
          <option value="CREATE_NEW" className={styles.createOption}>
            + Crear nueva categoría
          </option>
        )}
      </select>
      
      <div className={styles.info}>
        <small className={styles.categoryCount}>
          {categories.length} categoría{categories.length !== 1 ? 's' : ''} disponible{categories.length !== 1 ? 's' : ''}
        </small>
        
        {categories.length === 0 && (
          <small className={styles.noCategories}>
            No hay categorías disponibles
            {showCreateOption && onCreateCategory && (
              <button 
                className={styles.createBtn}
                onClick={onCreateCategory}
                type="button"
              >
                Crear la primera categoría
              </button>
            )}
          </small>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
