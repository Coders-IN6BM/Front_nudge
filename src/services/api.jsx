import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3005/nudge/v1",
  timeout: 5000,
  httpsAgent: false,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (credentials) => {
  try {
    console.log('Enviando credenciales:', credentials); 
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.log('Error de login:', error.response?.data); 
    throw error; 
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.log('Error de registro:', error.response?.data);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {

    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    console.log('Error obteniendo perfil:', error.response?.data);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.put('/users/updateUser', profileData);
    return response.data;
  } catch (error) {
    console.log('Error actualizando perfil:', error.response?.data);
    throw error;
  }
};

// ==================== PUBLICACIONES ====================

export const createPublication = async (publicationData) => {
  try {
    const response = await apiClient.post('/publications/registerPublication/', publicationData);
    return response.data;
  } catch (error) {
    console.log('Error creando publicación:', error.response?.data);
    throw error;
  }
};

export const getPublicationById = async (uid) => {
  try {
    const response = await apiClient.get(`/publications/getPublication/${uid}`);
    return response.data;
  } catch (error) {
    console.log('Error obteniendo publicación:', error.response?.data);
    throw error;
  }
};

export const getPublications = async (limite = 5, desde = 0) => {
  try {
    const response = await apiClient.get(`/publications/getPublication/?limite=${limite}&desde=${desde}`);
    return response.data;
  } catch (error) {
    console.log('Error obteniendo publicaciones:', error.response?.data);
    throw error;
  }
};

export const updatePublication = async (publicationData) => {
  try {
    const response = await apiClient.patch('/publications/updatePublications/', publicationData);
    return response.data;
  } catch (error) {
    console.log('Error actualizando publicación:', error.response?.data);
    throw error;
  }
};

export const deletePublication = async (uid) => {
  try {
    const response = await apiClient.patch(`/publications/deletePublication/${uid}`);
    return response.data;
  } catch (error) {
    console.log('Error eliminando publicación:', error.response?.data);
    throw error;
  }
};

// ==================== CATEGORÍAS ====================

export const createCategory = async (categoryData) => {
  try {
    const response = await apiClient.post('/categories/create', categoryData);
    return response.data;
  } catch (error) {
    console.log('Error creando categoría:', error.response?.data);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories/');
    return response.data;
  } catch (error) {
    console.log('Error obteniendo categorías:', error.response?.data);
    throw error;
  }
};

// ==================== COMENTARIOS ====================

export const addComment = async (commentData) => {
  try {
    const response = await apiClient.post('/comments/addComment', commentData);
    return response.data;
  } catch (error) {
    console.log('Error agregando comentario:', error.response?.data);
    throw error;
  }
};

export const getUserComments = async (uid, limite = 10, desde = 0) => {
  try {
    const response = await apiClient.get(`/comments/getComment/${uid}?limite=${limite}&desde=${desde}`);
    return response.data;
  } catch (error) {
    console.log('Error obteniendo comentarios del usuario:', error.response?.data);
    throw error;
  }
};

export const updateComment = async (uid, commentData) => {
  try {
    const response = await apiClient.patch(`/comments/updateComment/${uid}`, commentData);
    return response.data;
  } catch (error) {
    console.log('Error actualizando comentario:', error.response?.data);
    throw error;
  }
};

export const deleteComment = async (uid, uidAuthor) => {
  try {
    const response = await apiClient.patch(`/comments/deleteComment/${uid}`, { uidAuthor });
    return response.data;
  } catch (error) {
    console.log('Error eliminando comentario:', error.response?.data);
    throw error;
  }
};

