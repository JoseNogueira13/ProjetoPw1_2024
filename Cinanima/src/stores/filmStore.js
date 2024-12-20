import { defineStore } from 'pinia';

export const useFilmStore = defineStore('filmes', {
  state: () => ({
    filmes:
    [
      {
        idFilm: 1,
        nome: 'O Senhor dos Anéis',
        genero: 'Fantasia',
        duracao: 180,
        faixaEtaria: 14,
        diretor: 'Peter Jackson',
      },
    ],
  }),

  getters: {
    getFilmes: (state) => state.filmes,
  },

  actions: {

  },
  persist: true
});
