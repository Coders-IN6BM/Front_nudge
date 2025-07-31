import React, { useState } from 'react';
import SlideBar from '../../components/navBar/slideBar.jsx';
import CategoryManagement from '../admin/CategoryManagement.jsx';
import PublicationManagement from '../admin/PublicationManagement.jsx';
import styles from './dashboard.module.css';

// Componente temporal para secciones no implementadas
const ComingSoon = ({ title, description, icon }) => (
  <div className={styles.comingSoon}>
    <div className={styles.comingSoonIcon}>{icon}</div>
    <h2 className={styles.comingSoonTitle}>{title}</h2>
    <p className={styles.comingSoonDescription}>{description}</p>
    <div className={styles.comingSoonBadge}>Próximamente</div>
  </div>
);

// Vista general del dashboard
const Overview = () => (
  <div className={styles.overview}>
    <div className={styles.overviewHeader}>
      <h1 className={styles.overviewTitle}>Panel de Administración</h1>
      <p className={styles.overviewSubtitle}>
        Bienvenido al centro de control de Nudge
      </p>
    </div>

    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.statIcon}>📂</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>-</h3>
          <p className={styles.statLabel}>Categorías</p>
        </div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statIcon}>📄</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>-</h3>
          <p className={styles.statLabel}>Publicaciones</p>
        </div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statIcon}>👥</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>-</h3>
          <p className={styles.statLabel}>Usuarios</p>
        </div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.statIcon}>💬</div>
        <div className={styles.statContent}>
          <h3 className={styles.statNumber}>-</h3>
          <p className={styles.statLabel}>Comentarios</p>
        </div>
      </div>
    </div>

    <div className={styles.quickActions}>
      <h2 className={styles.quickActionsTitle}>Acciones Rápidas</h2>
      <div className={styles.actionGrid}>
        <button className={styles.actionCard}>
          <span className={styles.actionIcon}>📂</span>
          <span className={styles.actionLabel}>Nueva Categoría</span>
        </button>
        
        <button className={styles.actionCard}>
          <span className={styles.actionIcon}>📄</span>
          <span className={styles.actionLabel}>Nueva Publicación</span>
        </button>
        
        <button className={styles.actionCard}>
          <span className={styles.actionIcon}>👤</span>
          <span className={styles.actionLabel}>Gestionar Usuarios</span>
        </button>
        
        <button className={styles.actionCard}>
          <span className={styles.actionIcon}>💬</span>
          <span className={styles.actionLabel}>Moderar Comentarios</span>
        </button>
      </div>
    </div>

    <div className={styles.recentActivity}>
      <h2 className={styles.activityTitle}>Actividad Reciente</h2>
      <div className={styles.activityList}>
        <div className={styles.activityItem}>
          <div className={styles.activityIcon}>📄</div>
          <div className={styles.activityContent}>
            <p className={styles.activityText}>Sistema iniciado correctamente</p>
            <span className={styles.activityTime}>Ahora</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState('overview');

  const renderContent = () => {
    switch(currentSection) {
      case 'overview':
        return <Overview />;
      
      case 'categories':
        return <CategoryManagement />;
      
      case 'publications':
        return <PublicationManagement />;
      
      case 'users':
        return (
          <ComingSoon 
            title="Gestión de Usuarios"
            description="Administra todos los usuarios del sistema, sus roles y permisos."
            icon="👥"
          />
        );
      
      case 'comments':
        return (
          <ComingSoon 
            title="Moderación de Comentarios"
            description="Revisa y modera los comentarios de las publicaciones."
            icon="💬"
          />
        );
      
      case 'settings':
        return (
          <ComingSoon 
            title="Configuración del Sistema"
            description="Ajusta las configuraciones generales de la plataforma."
            icon="⚙️"
          />
        );
      
      default:
        return <Overview />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <SlideBar 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />
      
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
