import { defineStore } from "pinia";

export const useMiniFilmStore = defineStore("miniFilm", {
  state: () => ({
    films: [
      {
        idFilm: 1,
        name: "The Lord of the Rings",
        genre: "Fantasy",
        duration: 180,
        ageRating: 14,
        director: "Peter Jackson",
      },
      {
        idFilm: 2,
        name: "The Matrix",
        genre: "Sci-Fi",
        duration: 136,
        ageRating: 16,
        director: "The Wachowskis",
      },
      {
        idFilm: 3,
        name: "Inception",
        genre: "Sci-Fi",
        duration: 148,
        ageRating: 13,
        director: "Christopher Nolan",
      },
      {
        idFilm: 4,
        name: "The Dark Knight",
        genre: "Action",
        duration: 152,
        ageRating: 12,
        director: "Christopher Nolan",
      },
      {
        idFilm: 5,
        name: "Forrest Gump",
        genre: "Drama",
        duration: 142,
        ageRating: 10,
        director: "Robert Zemeckis",
      },
      {
        idFilm: 6,
        name: "Pulp Fiction",
        genre: "Crime",
        duration: 154,
        ageRating: 18,
        director: "Quentin Tarantino",
      },
      {
        idFilm: 7,
        name: "The Shawshank Redemption",
        genre: "Drama",
        duration: 142,
        ageRating: 14,
        director: "Frank Darabont",
      },
      {
        idFilm: 8,
        name: "Interstellar",
        genre: "Sci-Fi",
        duration: 169,
        ageRating: 12,
        director: "Christopher Nolan",
      },
      {
        idFilm: 9,
        name: "Gladiator",
        genre: "Action",
        duration: 155,
        ageRating: 16,
        director: "Ridley Scott",
      },
      {
        idFilm: 10,
        name: "Avatar",
        genre: "Sci-Fi",
        duration: 162,
        ageRating: 12,
        director: "James Cameron",
      },
    ],
  }),

  getters: {
    getFilms: (state) => state.films,
    getFilmById: (state) => (id) => state.films.find((film) => film.idFilm === id),
  },

  actions: {
    addFilm(film) {
      this.films.push(film);
    },
    removeFilm(id) {
      this.films = this.films.filter((film) => film.idFilm !== id);
    },
    editFilm(updatedFilm) {
      const index = this.films.findIndex((film) => film.idFilm === updatedFilm.idFilm);
      if (index !== -1) {
        this.films[index] = { ...updatedFilm }; // Atualiza o filme correspondente
      }
    },
  },
  persist: true
});
