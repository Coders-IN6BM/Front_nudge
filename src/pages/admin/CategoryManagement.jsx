import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/api.jsx';
import CategoryForm from '../../components/CategoryForm.jsx';
import styles from './CategoryManagement.module.css';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleCategoryCreated = (newCategory) => {
    // Agregar la nueva categoría a la lista
    setCategories(prev => [newCategory, ...prev]);
    setShowCreateForm(false);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Si está mostrando el formulario de crear categoría
  if (showCreateForm) {
    return (
      <CategoryForm
        onCategoryCreated={handleCategoryCreated}
        onCancel={() => setShowCreateForm(false)}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Gestión de Categorías</h1>
          <p className={styles.subtitle}>
            Administra las categorías disponibles para las publicaciones
          </p>
        </div>
        
        <button 
          className={styles.createBtn}
          onClick={() => setShowCreateForm(true)}
        >
          <span className={styles.icon}>+</span>
          Nueva Categoría
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className={styles.searchSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar categorías por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
        
        <div className={styles.stats}>
          <span className={styles.stat}>
            Total: <strong>{categories.length}</strong>
          </span>
          {searchTerm && (
            <span className={styles.stat}>
              Filtradas: <strong>{filteredCategories.length}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Cargando categorías...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <div className={styles.errorIcon}>⚠️</div>
            <h3>Error al cargar categorías</h3>
            <p>{error}</p>
            <button className={styles.retryBtn} onClick={loadCategories}>
              Reintentar
            </button>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className={styles.empty}>
            {searchTerm ? (
              <>
                <div className={styles.emptyIcon}>🔍</div>
                <h3>No se encontraron categorías</h3>
                <p>No hay categorías que coincidan con "{searchTerm}"</p>
                <button 
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchTerm('')}
                >
                  Limpiar búsqueda
                </button>
              </>
            ) : (
              <>
                <div className={styles.emptyIcon}>📂</div>
                <h3>No hay categorías</h3>
                <p>Crea la primera categoría para organizar las publicaciones</p>
                <button 
                  className={styles.createFirstBtn}
                  onClick={() => setShowCreateForm(true)}
                >
                  Crear primera categoría
                </button>
              </>
            )}
          </div>
        ) : (
          /* Lista de categorías */
          <div className={styles.categoriesGrid}>
            {filteredCategories.map((category) => (
              <div key={category.uid} className={styles.categoryCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <div className={styles.cardActions}>
                    <button 
                      className={styles.editBtn}
                      title="Editar categoría"
                    >
                      ✏️
                    </button>
                    <button 
                      className={styles.deleteBtn}
                      title="Eliminar categoría"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                {category.description && (
                  <p className={styles.categoryDescription}>
                    {category.description}
                  </p>
                )}
                
                <div className={styles.cardFooter}>
                  <div className={styles.categoryInfo}>
                    <span className={styles.dateInfo}>
                      Creada: {formatDate(category.createdAt)}
                    </span>
                    {category.updatedAt !== category.createdAt && (
                      <span className={styles.dateInfo}>
                        Actualizada: {formatDate(category.updatedAt)}
                      </span>
                    )}
                  </div>
                  
                  <div className={styles.status}>
                    <span 
                      className={`${styles.statusBadge} ${
                        category.status ? styles.active : styles.inactive
                      }`}
                    >
                      {category.status ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
