import React from "react"
import { useNavigate } from "react-router-dom"
import "./HomePage.css"

function Homepage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="homepage-wrapper">
      <header className="topbar">
        <div className="logo">Nudge</div>
        <nav className="nav-links-horizontal">
          <a href="#sobre">Sobre Nudge</a>
          <a href="#empresas">Empresas</a>
          <a href="#servicios">Servicios</a>
          <a href="#footer">Contacto</a>
        </nav>
        <div className="auth-section">
          <button className="login-button" onClick={handleLoginClick}>
            Iniciar sesión
          </button>
        </div>
      </header>

      <main className="main-content">
        <section id="sobre" className="about-section">
          <h2>Sobre Nudge</h2>
          <p>
            Nudge es una plataforma diseñada para conectar el talento joven con oportunidades reales en el mercado laboral. 
            Nuestra misión es reducir la brecha entre la formación técnica y el empleo de calidad. A través de alianzas estratégicas 
            con empresas reconocidas, servicios personalizados y un enfoque humano, ayudamos a transformar vidas mediante el trabajo.
          </p>
        </section>

        <section id="empresas" className="companies-section">
          <h2>Principales empresas en busca de talento</h2>
          <div className="companies-grid">
            <div className="company">Telus Digital GT<br /><span>Outsourcing - ⭐ 4.9 (37 Reviews)</span></div>
            <div className="company">CMI<br /><span>Multinacional - ⭐ 4.9 (37 Reviews)</span></div>
            <div className="company">Hospital Herrera Llerandi<br /><span>⭐ 4.9 (37 Reviews)</span></div>
            <div className="company">Fundación Kinal<br /><span>Educativa - ⭐ 4.9 (37 Reviews)</span></div>
            <div className="company">Tigo Guatemala<br /><span>Telecomunicaciones - ⭐ 4.8 (52 Reviews)</span></div>
            <div className="company">Banco Industrial<br /><span>Banca - ⭐ 4.7 (89 Reviews)</span></div>
            <div className="company">Agexport<br /><span>Exportación - ⭐ 4.6 (40 Reviews)</span></div>
            <div className="company">Cervecería Centro Americana<br /><span>Industria - ⭐ 4.9 (65 Reviews)</span></div>
          </div>
        </section>

        <section id="servicios" className="services-section">
          <h2>Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Asesoría Profesional</h3>
              <p>Contamos con asesoría personalizada para que encuentres oportunidades que se alineen a tu perfil.</p>
            </div>
            <div className="service-card">
              <h3>Entrenamiento Técnico</h3>
              <p>Ofrecemos capacitaciones prácticas para aumentar tus habilidades y empleabilidad.</p>
            </div>
            <div className="service-card">
              <h3>Bolsa de Empleo</h3>
              <p>Accede a cientos de ofertas laborales en empresas líderes del país.</p>
            </div>
            <div className="service-card">
              <h3>Seguimiento Post-Contratación</h3>
              <p>Te acompañamos después de ser contratado para garantizar tu éxito profesional.</p>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer">
        <p>&copy; 2025 Nudge. Todos los derechos reservados.</p>
        <p>Contacto: info@nudge.gt | Tel: +502 1234-5678</p>
      </footer>
    </div>
  )
}

export default Homepage