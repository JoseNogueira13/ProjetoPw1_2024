//import axios from 'axios';

/*Pedido do professor */
import { defineStore } from "pinia";
import * as API from "../API/api";

const API_KEY = 'e822b54ec67f836fb05ce1d59e337e21';
const BASE_URL = 'https://api.themoviedb.org/3';
//const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const useMiniFilmStore = defineStore("miniFilm", {
  state: () => ({
    miniFilms: [],
    loading: false,
    error: null,
  }),

  getters: {
    getFilms: (state) => state.miniFilms,
  },

  actions: {
    async fetchMiniFilms() {
      this.loading = true;
      this.error = null;
      try {
        const response = await API.get(BASE_URL, 'discover/movie'); console.log(response);
        //this.miniFilms = response.data || []; console.log(this.miniFilms);


      }
      catch (error) {
        this.error = error.message || "Erro desconhecido";
      }
      finally {
        this.loading = false;
      }
    },
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
