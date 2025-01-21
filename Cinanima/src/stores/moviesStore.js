//import axios from 'axios';

/*Pedido do professor */
import { defineStore } from "pinia";
import * as API from "../API/api";

import { useUserStore } from "@/stores/userStore";

const API_KEY = 'e822b54ec67f836fb05ce1d59e337e21';
const BASE_URL = `https://api.themoviedb.org/3`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const useMiniFilmStore = defineStore("miniFilm", {
  state: () => ({
    miniFilms: [],
    loading: false,
    error: null,
    currentMovie: null,
    comments: JSON.parse(localStorage.getItem("movieComments")) || {},
    likes: {},
  }),

  getters: {
    getMiniFilms: (state) => state.miniFilms,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getCurrentMovie: (state) => state.currentMovie,
  },

  actions: {
    async fetchMiniFilms() {
      this.loading = true;
      this.error = null;
      try {
        const response = await API.get(
          BASE_URL,
          `discover/movie?api_key=${API_KEY}&with_genres=16&with_runtime.lte=40`
        );

        this.miniFilms = response.results.map((miniFilm) => ({
          id: miniFilm.id,
          title: miniFilm.title,
          description: miniFilm.overview,
          image: `${IMAGE_BASE_URL}${miniFilm.poster_path}`,
        }));
      } catch (error) {
        this.error = error.message || "Erro desconhecido ao carregar filmes.";
      } finally {
        this.loading = false;
      }
    },
    async fetchMovieDetails(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await API.get(BASE_URL,`movie/${id}?api_key=${API_KEY}`); //console.log(response);

        this.currentMovie = {
          id: response.id,
          title: response.title,
          description: response.overview,
          image: `${IMAGE_BASE_URL}${response.poster_path}`,
          releaseDate: response.release_date,
          rating: response.vote_average,
          likes: 0,
        }; console.log(this.currentMovie)
      } catch (error) {
        this.error = error.message || "Failed to fetch movie details";
      } finally {
        this.loading = false;
      }
    },/*--------------------------------Funções admistrador--------------------------------*/
    addFilm(film) {
      this.miniFilms.push(film);
    },
    removeFilm(id) {
      this.miniFilms = this.miniFilms.filter((film) => film.idFilm !== id);
    },
    editFilm(updatedFilm) {
      const index = this.miniFilms.findIndex((film) => film.idFilm === updatedFilm.idFilm);
      if (index !== -1) {
        this.miniFilms[index] = { ...updatedFilm }; // Atualiza o filme correspondente
      }
    },
    likeMovie(id) {
      const userStore = useUserStore();
      if (!userStore.user) {
        console.error("User is not logged in!");
        return;
      }

      const movie = this.miniFilms.find((film) => film.id === id);
      if (!movie) {
        console.error("Movie not found!");
        return;
      }

      if (userStore.user.likedMovies.includes(id)) {
        console.log("User has already liked this movie!");
        return;
      }

      movie.likes = (movie.likes || 0) + 1;

      userStore.user.likedMovies.push(id);

      localStorage.setItem("currentUser", JSON.stringify(userStore.user));
      localStorage.setItem("miniFilms", JSON.stringify(this.miniFilms));

      if (this.currentMovie?.id === id) {
        this.currentMovie.likes = (this.currentMovie.likes || 0) + 1;
      }

      console.log(`Movie with ID ${id} liked by ${userStore.user.name}`);
    },
    addComment(movieId, comment) {
      if (!this.comments[movieId]) {
        this.comments[movieId] = [];
      }
      this.comments[movieId].push(comment);

      localStorage.setItem("movieComments", JSON.stringify(this.comments));
    },
  },
  persist: true,
});
