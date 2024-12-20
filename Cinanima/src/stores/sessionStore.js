import { defineStore } from 'pinia';

export const useSessionStore = defineStore('sessions', {
  state: () => ({
    sessions: [
      {
        idSession: 1,
        idFilm: 1,
        idRoom: 1,
        time: '14:00',
      },
    ],
  }),

  getters: {
    getSessions: (state) => state.sessions,
  },

  actions: {

  },
  persist: true
});
