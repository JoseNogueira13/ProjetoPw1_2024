import { defineStore } from 'pinia';

export const useFilmStore = defineStore('film', {
  state: () => ({
    films: [
      {
        idFilm: 1,
        name: 'The Lord of the Rings',
        genre: 'Fantasy',
        duration: 180,
        ageRating: 14,
        director: 'Peter Jackson',
      },
    ],
  }),

  getters: {
    getFilms: (state) => state.films,
  },

  actions: {

  },
  persist: true
});
