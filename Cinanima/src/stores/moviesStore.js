import { defineStore } from 'pinia';
import axios from 'axios';

const API_KEY = 'e822b54ec67f836fb05ce1d59e337e21';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMovies() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            with_genres: 16,
          },
        });

        this.movies = response.data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          image: `${IMAGE_BASE_URL}${movie.poster_path}`,
        }));
      } catch (error) {
        this.error = 'Failed to fetch movies.';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});

















// import { defineStore } from "pinia";

// export const useMiniFilmStore = defineStore("miniFilm", {
//   state: () => ({
//     films: [
//       {
//         idFilm: 1,
//         name: "The Lord of the Rings",
//         genre: "Fantasy",
//         duration: 180,
//         ageRating: 14,
//         director: "Peter Jackson",
//       },
//       {
//         idFilm: 2,
//         name: "The Matrix",
//         genre: "Sci-Fi",
//         duration: 136,
//         ageRating: 16,
//         director: "The Wachowskis",
//       },
//       {
//         idFilm: 3,
//         name: "Inception",
//         genre: "Sci-Fi",
//         duration: 148,
//         ageRating: 13,
//         director: "Christopher Nolan",
//       },
//       {
//         idFilm: 4,
//         name: "The Dark Knight",
//         genre: "Action",
//         duration: 152,
//         ageRating: 12,
//         director: "Christopher Nolan",
//       },
//       {
//         idFilm: 5,
//         name: "Forrest Gump",
//         genre: "Drama",
//         duration: 142,
//         ageRating: 10,
//         director: "Robert Zemeckis",
//       },
//       {
//         idFilm: 6,
//         name: "Pulp Fiction",
//         genre: "Crime",
//         duration: 154,
//         ageRating: 18,
//         director: "Quentin Tarantino",
//       },
//       {
//         idFilm: 7,
//         name: "The Shawshank Redemption",
//         genre: "Drama",
//         duration: 142,
//         ageRating: 14,
//         director: "Frank Darabont",
//       },
//       {
//         idFilm: 8,
//         name: "Interstellar",
//         genre: "Sci-Fi",
//         duration: 169,
//         ageRating: 12,
//         director: "Christopher Nolan",
//       },
//       {
//         idFilm: 9,
//         name: "Gladiator",
//         genre: "Action",
//         duration: 155,
//         ageRating: 16,
//         director: "Ridley Scott",
//       },
//       {
//         idFilm: 10,
//         name: "Avatar",
//         genre: "Sci-Fi",
//         duration: 162,
//         ageRating: 12,
//         director: "James Cameron",
//       },
//     ],
//   }),

//   getters: {
//     getFilms: (state) => state.films,
//     getFilmById: (state) => (id) => state.films.find((film) => film.idFilm === id),
//   },

//   actions: {
//     addFilm(film) {
//       this.films.push(film);
//     },
//     removeFilm(id) {
//       this.films = this.films.filter((film) => film.idFilm !== id);
//     },
//     editFilm(updatedFilm) {
//       const index = this.films.findIndex((film) => film.idFilm === updatedFilm.idFilm);
//       if (index !== -1) {
//         this.films[index] = { ...updatedFilm }; // Atualiza o filme correspondente
//       }
//     },
//   },
//   persist: true
// });
