const BaseURL = 'http://localhost:8000/api/v1/';
const SocketURL = 'http://178.128.29.7:5511';

const Endpoint = {
  auth: {
    login: 'login',
    register: 'register',
    logout: 'logout',
  },

  articles: {
    getArticles: 'articles',
    showArticle: 'article/',
  },
  categories: {
    getCategories: 'categories',
  },
  sources: {
    getSources: 'sources',
  },

  authors: {
    getAuthors: 'authors',
  },

  profile: {
    getUserProfile: 'user/get-profile/',
    updateProfile: 'user/update-profile',
    changePassword: 'change-password',
  },

  preferences: {
    getPreferences: 'user/get/',
    setPreferences: 'user/set-preferences',
  },
};

export { BaseURL, Endpoint, SocketURL };
