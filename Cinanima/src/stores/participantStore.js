import { defineStore } from 'pinia';

export const useParticipantStore = defineStore('participantes', {
  state: () => ({
    participantes:
    [
      {
        idParticipante: 1,
        idSessao: 1,
        nome: 'João Silva',
        idade: 25,
      },
    ],
  }),

  getters: {
    getParticpantes: (state) => state.participantes,
  },

  actions: {

  },
  persist: true
});
