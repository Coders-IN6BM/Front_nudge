import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth.jsx';
import styles from './slideBar.module.css';

const SlideBar = ({ currentSection, onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    {
      id: 'overview',
      label: 'Panel Principal',
      icon: '📊',
      description: 'Vista general del sistema'
    },
    {
      id: 'categories',
      label: 'Categorías',
      icon: '📂',
      description: 'Gestionar categorías'
    },
    {
      id: 'publications',
      label: 'Publicaciones',
      icon: '📄',
      description: 'Administrar publicaciones'
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: '👥',
      description: 'Gestión de usuarios'
    },
    {
      id: 'comments',
      label: 'Comentarios',
      icon: '💬',
      description: 'Moderar comentarios'
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: '⚙️',
      description: 'Ajustes del sistema'
    }
  ];

  const handleMenuClick = (sectionId) => {
    onSectionChange(sectionId);
  };

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      await logout();
      navigate('/');
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Header del sidebar */}
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎯</span>
          {!isCollapsed && <span className={styles.logoText}>Nudge Admin</span>}
        </div>
        
        <button 
          className={styles.toggleBtn}
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
        >
          {isCollapsed ? '▶️' : '◀️'}
        </button>
      </div>

      {/* Información del usuario */}
      <div className={styles.userInfo}>
        <div className={styles.userAvatar}>
          <span className={styles.avatarIcon}>👤</span>
        </div>
        {!isCollapsed && (
          <div className={styles.userDetails}>
            <span className={styles.userName}>
              {user?.name || 'Administrador'}
            </span>
            <span className={styles.userRole}>Admin</span>
          </div>
        )}
      </div>

      {/* Navegación principal */}
      <nav className={styles.navigation}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.menuItem}>
              <button
                className={`${styles.menuButton} ${
                  currentSection === item.id ? styles.active : ''
                }`}
                onClick={() => handleMenuClick(item.id)}
                title={isCollapsed ? item.label : item.description}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                {!isCollapsed && (
                  <span className={styles.menuLabel}>{item.label}</span>
                )}
                {currentSection === item.id && (
                  <div className={styles.activeIndicator}></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Acciones del footer */}
      <div className={styles.sidebarFooter}>
        <button
          className={styles.profileBtn}
          onClick={() => navigate('/profile')}
          title="Ver perfil"
        >
          <span className={styles.menuIcon}>👤</span>
          {!isCollapsed && <span className={styles.menuLabel}>Mi Perfil</span>}
        </button>

        <button
          className={styles.homeBtn}
          onClick={() => navigate('/')}
          title="Ir al inicio"
        >
          <span className={styles.menuIcon}>🏠</span>
          {!isCollapsed && <span className={styles.menuLabel}>Inicio</span>}
        </button>

        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <span className={styles.menuIcon}>🚪</span>
          {!isCollapsed && <span className={styles.menuLabel}>Salir</span>}
        </button>
      </div>

      {/* Versión */}
      {!isCollapsed && (
        <div className={styles.version}>
          <small>Nudge Admin v1.0</small>
        </div>
      )}
    </div>
  );
};

export default SlideBar;
