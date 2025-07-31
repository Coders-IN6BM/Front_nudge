import React, { useState, useEffect } from 'react';
import { getPublications, deletePublication } from '../../services/api.jsx';
import PublicationForm from '../../components/PublicationForm.jsx';
import styles from './PublicationManagement.module.css';

const PublicationManagement = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      setLoading(true);
      setError('');
      // Cargar más publicaciones para admin
      const response = await getPublications(50, 0);
      
      if (response.success && response.publication) {
        setPublications(response.publication);
      } else {
        setError('No se pudieron cargar las publicaciones');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al cargar publicaciones';
      setError(errorMessage);
      console.error('Error cargando publicaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublicationCreated = (newPublication) => {
    // Agregar la nueva publicación al inicio de la lista
    setPublications(prev => [newPublication, ...prev]);
    setShowCreateForm(false);
  };

  const handleDeletePublication = async (publicationId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      return;
    }

    try {
      const response = await deletePublication(publicationId);
      if (response.success) {
        // Remover la publicación de la lista
        setPublications(prev => prev.filter(pub => pub.uid !== publicationId));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al eliminar publicación';
      alert(errorMessage);
    }
  };

  // Filtrar y ordenar publicaciones
  const getFilteredAndSortedPublications = () => {
    let filtered = publications.filter(publication => {
      const matchesSearch = 
        publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.publicationContent.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        filterCategory === 'all' || 
        publication.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Ordenar
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredPublications = getFilteredAndSortedPublications();

  // Obtener categorías únicas para el filtro
  const uniqueCategories = [...new Set(publications.map(pub => pub.category))];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Si está mostrando el formulario de crear publicación
  if (showCreateForm) {
    return (
      <PublicationForm
        onPublicationCreated={handlePublicationCreated}
        onCancel={() => setShowCreateForm(false)}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Gestión de Publicaciones</h1>
          <p className={styles.subtitle}>
            Administra todas las publicaciones del sistema
          </p>
        </div>
        
        <button 
          className={styles.createBtn}
          onClick={() => setShowCreateForm(true)}
        >
          <span className={styles.icon}>+</span>
          Nueva Publicación
        </button>
      </div>

      {/* Controles de filtrado y búsqueda */}
      <div className={styles.controlsSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar por título o contenido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <div className={styles.filters}>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Todas las categorías</option>
            {uniqueCategories.map(categoryId => (
              <option key={categoryId} value={categoryId}>
                {categoryId}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguas</option>
            <option value="title">Por título</option>
          </select>
        </div>

        <div className={styles.stats}>
          <span className={styles.stat}>
            Total: <strong>{publications.length}</strong>
          </span>
          {(searchTerm || filterCategory !== 'all') && (
            <span className={styles.stat}>
              Filtradas: <strong>{filteredPublications.length}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Cargando publicaciones...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <div className={styles.errorIcon}>⚠️</div>
            <h3>Error al cargar publicaciones</h3>
            <p>{error}</p>
            <button className={styles.retryBtn} onClick={loadPublications}>
              Reintentar
            </button>
          </div>
        ) : filteredPublications.length === 0 ? (
          <div className={styles.empty}>
            {searchTerm || filterCategory !== 'all' ? (
              <>
                <div className={styles.emptyIcon}>🔍</div>
                <h3>No se encontraron publicaciones</h3>
                <p>No hay publicaciones que coincidan con los filtros aplicados</p>
                <button 
                  className={styles.clearFiltersBtn}
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('all');
                  }}
                >
                  Limpiar filtros
                </button>
              </>
            ) : (
              <>
                <div className={styles.emptyIcon}>📄</div>
                <h3>No hay publicaciones</h3>
                <p>Crea la primera publicación para comenzar</p>
                <button 
                  className={styles.createFirstBtn}
                  onClick={() => setShowCreateForm(true)}
                >
                  Crear primera publicación
                </button>
              </>
            )}
          </div>
        ) : (
          /* Lista de publicaciones */
          <div className={styles.publicationsGrid}>
            {filteredPublications.map((publication) => (
              <div key={publication.uid} className={styles.publicationCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleArea}>
                    <h3 className={styles.publicationTitle}>
                      {publication.title}
                    </h3>
                    <span className={styles.categoryBadge}>
                      {publication.categoryName || publication.category}
                    </span>
                  </div>
                  
                  <div className={styles.cardActions}>
                    <button 
                      className={styles.viewBtn}
                      title="Ver publicación"
                    >
                      👁️
                    </button>
                    <button 
                      className={styles.editBtn}
                      title="Editar publicación"
                    >
                      ✏️
                    </button>
                    <button 
                      className={styles.deleteBtn}
                      title="Eliminar publicación"
                      onClick={() => handleDeletePublication(publication.uid)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className={styles.publicationContent}>
                  <p className={styles.contentPreview}>
                    {truncateText(publication.publicationContent)}
                  </p>
                </div>
                
                <div className={styles.cardFooter}>
                  <div className={styles.publicationInfo}>
                    <span className={styles.dateInfo}>
                      {formatDate(publication.date)}
                    </span>
                    <span className={styles.authorInfo}>
                      ID: {publication.owner}
                    </span>
                  </div>
                  
                  <div className={styles.engagementInfo}>
                    <span className={styles.commentsCount}>
                      💬 {publication.comments?.length || 0}
                    </span>
                    <span 
                      className={`${styles.statusBadge} ${
                        publication.status ? styles.active : styles.inactive
                      }`}
                    >
                      {publication.status ? 'Activa' : 'Inactiva'}
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

export default PublicationManagement;
