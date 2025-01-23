import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isUserAuthenticated: false,
    user: null,
    users: [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        information: [null],
        roles: ['admin'],
        ticketType: [],
        calendar: [],
        likedMovies: [],
      },
      {
        id: 2,
        name: 'User',
        email: 'user@email.com',
        password: 'user123',
        information: [null],
        roles: ['user'],
        ticketType: [],
        calendar: [],
        likedMovies: [],
      }
    ],
  }),

  getters: {
    isAuthenticated: (state) => state.isUserAuthenticated,
    getUser: (state) => state.user,
    getUserCalendar: (state) => state.user?.calendar || [],
    getLikedMovies: (state) => state.user?.likedMovies || [],
  },

  actions: {
    login(email, password) {
      const user = this.users.find((user) => user.email == email && user.password == password)
      //console.log(user)

      if (user) {
        this.isUserAuthenticated = true
        this.user = user
      } else {
        throw Error('User invalid!')
      }
    },
    register(username, email, password, cPassword) {
      if (password !== cPassword) {
        throw new Error('Passwords do not match.');
      }
    
      const emailExists = this.users.some((user) => user.email === email);
      if (emailExists) {
        throw new Error('Email already in use.');
      }
    
      const newUser = {
        id: this.users.length + 1,
        name: username,
        email: email,
        password,
        information: [null],
        roles: ['user'],
        ticketType: [],
        calendar: [],
        likedMovies: [],
      };
    
      this.users.push(newUser);
      alert('Registration successful! You can now log in.');
    },
    
    logout() {
      this.isUserAuthenticated = false
      this.user = null
    },
    addToCalendar(filmId) {
      console.log(filmId)
      if (!this.user) {
        console.log('No user is logged in.')
        return
      }

      const existingFilm = this.user.calendar.find((item) => item.filmId.id === filmId.id)

      if (!existingFilm) {
        this.user.calendar.push({ filmId, seen: false })
        console.log(`Film with ID: ${filmId} added to calendar.`)
      } else {
        console.log(`Film with ID: ${filmId} is already in the calendar.`)
      }
    },
    markFilmAsSeen(filmId) {
      if (!this.user) return

      const film = this.user.calendar.find((item) => item.filmId.id === filmId)
      if (film) {
        film.seen = true
        console.log(`Film with ID: ${filmId} marked as seen.`)
      }
    },
    removeFromCalendar(filmId) {
      if (!this.user) return

      // Filtrando os filmes e criando um novo array
      this.user.calendar = this.user.calendar.filter((item) => {
        item.filmId.id !== filmId
      })
      //console.log(this.user.calendar)

      // Forçar a reatividade
      console.log(`Film with ID: ${filmId} removed from calendar.`)
    },
  },
  persist: true,
})
