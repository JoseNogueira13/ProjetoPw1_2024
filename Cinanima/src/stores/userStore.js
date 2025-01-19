import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    users: [
      {
        id: 1,
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin123",
        information: [null],
        roles: ["admin"],
        ticketType: [],
        calendar: [],
        likedMovies: [],
      },
    ],
  }),

  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
    getUserCalendar: (state) => state.user?.calendar || [],
    getLikedMovies: (state) => state.user?.likedMovies || [],
  },

  actions: {
    login(email, password) {
      const user = this.users.find(
        (user) => user.email == email &&
        user.password == password
      ); console.log(user);

      if (user) {
        this.isUserAuthenticated = true;
        this.user = user;
      } else {
        throw Error("User invalid!");
      }
    },
    register(username, email, password, cPassword) {
      const check = this.users.find(
        (user) => user.email == email && password == cPassword
      )
      if (!check) {
        throw new Error('Email already in use.');
      }

      const newUser = {
        id: this.users.lenght + 1,
        name:username,
        email: email,
        information: [null],
        roles: ["user"],
        ticketType: [],
        calendar: [],
        likedMovies: [],
      }
      this.users.push(newUser);
      alert('Registration successful! You can now log in.');
    },
    logout() {
      this.isUserAuthenticated = false;
      this.user = null;
    }
  },
  persist: true,
});


/*
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
        ticketType: [],
        calendar : [],
        likedMovies: [],
      },
      {
        id: 2,
        name: 'User',
        email: 'user@gmail.com',
        password: 'user123',
        information: [null],
        roles: ['user'],
        ticketType: [],
        calendar : [],
        likedMovies: [],
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
    getUserCalendar: (state) => state.user?.calendar || [],
    getLikedMovies: (state) => state.user?.likedMovies || [],
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

    addToCalendar(filmId) {
      if (!this.user) {
        console.error('No user is logged in.');
        return;
      }

      const existingFilm = this.user.calendar.find(
        (item) => item.filmId.id === filmId.id
      );

      if (!existingFilm) {
        this.user.calendar.push({ filmId, seen: false });
        localStorage.setItem("currentUser", JSON.stringify(this.user));
        console.log(`Film with ID: ${filmId.id} added to calendar.`);
      } else {
        console.log(`Film with ID: ${filmId.id} is already in the calendar.`);
      }
    },


    markFilmAsSeen(filmId) {
      if (!this.user) return;

      const film = this.user.calendar.find((item) => item.filmId.id === filmId);
      if (film) {
        film.seen = true;
        localStorage.setItem("currentUser", JSON.stringify(this.user));
        console.log(`Film with ID: ${filmId} marked as seen.`);
      }
    },

    removeFromCalendar(filmId) {
      if (!this.user) return;

      this.user.calendar = this.user.calendar.filter((item) => item.filmId.id !== filmId);
      localStorage.setItem("currentUser", JSON.stringify(this.user));
      console.log(`Film with ID: ${filmId} removed from calendar.`);
    },
  },
  persist: true
});
*/
