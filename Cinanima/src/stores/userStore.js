import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        information: [null],
        roles: ['admin'],
      },
      {
        id: 2,
        name: 'User',
        email: 'user@gmail.com',
        password: 'user123',
        information: [null],
        roles: ['user'],
      },
    ],
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.roles.includes('admin') || false,
    decodedToken: (state) => {
      if (!state.token) return null;
      try {
        const [, payload] = state.token.split('.');
        return JSON.parse(atob(payload));
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    },
  },

  actions: {
    login({ email, password }) {
      const user = this.users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password.');
      }

      const payload = {
        id: user.id,
        email: user.email,
        roles: user.roles,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };
      const token = this.generateToken(payload);

      this.user = user;
      this.token = token;

      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', true);
    },

    register({ name, email, password }) {
      const existingUser = this.users.find((user) => user.email === email);

      if (existingUser) {
        throw new Error('Email already in use.');
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        roles: ['user'],
      };

      this.users.push(newUser);
      alert('Registration successful! You can now log in.');
    },

    logout() {
      this.user = null;
      this.token = null;

      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
    },

    verifyToken() {
      const now = Math.floor(Date.now() / 1000);
      const decoded = this.decodedToken;

      if (!decoded || decoded.exp < now) {
        this.logout();
        throw new Error('Token expired or invalid. Please log in again.');
      }

      return decoded;
    },

    generateToken(payload) {
      const header = { alg: 'none', typ: 'JWT' };
      const encodedHeader = btoa(JSON.stringify(header));
      const encodedPayload = btoa(JSON.stringify(payload));
      return `${encodedHeader}.${encodedPayload}.`;
    },
  },
});
