import { defineStore } from 'pinia';

export const useRoomStore = defineStore('salas', {
  state: () => ({
    salas:
    [
      {
        idSala: 1,
        nome: 'Sala 1',
        capacidade: 50,
      },
    ],
  }),

  getters: {
    getSalas: (state) => state.salas,
  },

  actions: {

  },
  persist: true
});
