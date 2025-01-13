//import axios from 'axios';

/*Pedido do professor */
import { defineStore } from "pinia";
import * as API from "../API/api";

const API_KEY = 'e822b54ec67f836fb05ce1d59e337e21';
const BASE_URL = `https://api.themoviedb.org/3`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const useMiniFilmStore = defineStore("miniFilm", {
  state: () => ({
    miniFilms: [],
    loading: false,
    error: null,
    currentMovie: null,
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
        const response = await API.get(BASE_URL, `discover/movie?api_key=${API_KEY}`); //console.log(response);

        this.miniFilms = response.results.map(miniFilm => ({
          id: miniFilm.id,
          title: miniFilm.title,
          description: miniFilm.overview,
          image: `${IMAGE_BASE_URL}${miniFilm.poster_path}`,
        })); console.log(this.miniFilms)
      }
      catch (error) {
        this.error = error.message || "Erro desconhecido";
      }
      finally {
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
  },
  persist: true,
});
