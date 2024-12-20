import { defineStore } from 'pinia';

export const useSessionStore = defineStore('salas', {
  state: () => ({
    sessoes:
    [
      {
        idSessao: 1,
        idFilme: 1,
        idSala: 1,
        horario: '14:00',
      },
    ],
  }),

  getters: {
    getSessoes: (state) => state.sessoes,
  },

  actions: {

  },
  persist: true
});
