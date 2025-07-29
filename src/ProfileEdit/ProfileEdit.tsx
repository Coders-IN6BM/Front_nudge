import React, { useRef, useState } from "react";
import styles from "./ProfileEdit.module.css";

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    summary: "",
    email: "",
    phone: "",
    linkedin: "",
    skills: "",
    experience: "",
    education: "",
    photo: "",
  });

  const [hoverPhoto, setHoverPhoto] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile((prev) => ({
          ...prev,
          photo: ev.target?.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.leftColumn}>
          <h2 className={styles.header}>Editar Perfil Profesional</h2>
          <form className={styles.form}>
            <label className={styles.label}>Nombre completo</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={profile.name}
              onChange={handleChange}
            />
            <label className={styles.label}>Título profesional</label>
            <input
              className={styles.input}
              type="text"
              name="title"
              placeholder="Título profesional"
              value={profile.title}
              onChange={handleChange}
            />
            <label className={styles.label}>Resumen profesional</label>
            <textarea
              className={styles.textarea}
              name="summary"
              placeholder="Resumen profesional"
              value={profile.summary}
              onChange={handleChange}
              rows={3}
            />
            <label className={styles.label}>Correo electrónico</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={profile.email}
              onChange={handleChange}
            />
            <label className={styles.label}>Teléfono</label>
            <input
              className={styles.input}
              type="tel"
              name="phone"
              placeholder="Teléfono"
              value={profile.phone}
              onChange={handleChange}
            />
            <label className={styles.label}>LinkedIn</label>
            <input
              className={styles.input}
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              value={profile.linkedin}
              onChange={handleChange}
            />
            <label className={styles.label}>Habilidades</label>
            <textarea
              className={styles.textarea}
              name="skills"
              placeholder="Habilidades (separadas por coma)"
              value={profile.skills}
              onChange={handleChange}
              rows={2}
            />
            <label className={styles.label}>Experiencia laboral</label>
            <textarea
              className={styles.textarea}
              name="experience"
              placeholder="Experiencia laboral"
              value={profile.experience}
              onChange={handleChange}
              rows={4}
            />
            <label className={styles.label}>Educación</label>
            <textarea
              className={styles.textarea}
              name="education"
              placeholder="Educación"
              value={profile.education}
              onChange={handleChange}
              rows={3}
            />
            <button className={styles.saveBtn} type="submit">
              Guardar cambios
            </button>
          </form>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.photoSection}>
            <div
              className={styles.photoPlaceholder}
              onMouseEnter={() => setHoverPhoto(true)}
              onMouseLeave={() => setHoverPhoto(false)}
            >
              {profile.photo && (
                <img
                  src={profile.photo}
                  alt="Foto de perfil"
                  className={styles.photoImg}
                />
              )}
              {(!profile.photo || hoverPhoto) && (
                <div
                  className={styles.photoCircle}
                  onClick={handlePhotoClick}
                  title="Cambiar foto"
                  style={{ zIndex: 2 }}
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 20 20">
                    <path d="M10 13.333a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666Z" stroke="#fff" strokeWidth="1.5"/>
                    <path d="M2.5 15.833V7.5a2.5 2.5 0 0 1 2.5-2.5h1.175a1 1 0 0 0 .95-.684l.35-1.05A1.667 1.667 0 0 1 9.025 2.5h1.95a1.667 1.667 0 0 1 1.55 1.766l.35 1.05a1 1 0 0 0 .95.684H15a2.5 2.5 0 0 1 2.5 2.5v8.333a2.5 2.5 0 0 1-2.5 2.5h-10a2.5 2.5 0 0 1-2.5-2.5Z" stroke="#fff" strokeWidth="1.5"/>
                  </svg>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </div>
            <span style={{ color: "#8f9f86", fontSize: "0.95rem", marginTop: "0.5rem" }}>
              Foto de perfil
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
