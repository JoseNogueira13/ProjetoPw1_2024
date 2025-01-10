<template>
    <div v-if="loading">Loading movie details...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="movie">
      <h1>{{ movie.title }}</h1>
      <img :src="movie.image" :alt="movie.title" />
      <p>{{ movie.description }}</p>
      <p><strong>Release Date:</strong> {{ movie.releaseDate }}</p>
      <p><strong>Rating:</strong> {{ movie.rating }}</p>
    </div>
  </template>
  
  <script>
  import { useMiniFilmStore } from "@/stores/moviesStore.js";
  
  export default {
    data() {
      return {
        miniFilmStore: useMiniFilmStore(),
      };
    },
    computed: {
      movie() {
        return this.miniFilmStore.getCurrentMovie;
      },
      loading() {
        return this.miniFilmStore.getLoading;
      },
      error() {
        return this.miniFilmStore.getError;
      },
    },
    async created() {
      const id = this.$route.params.id;
      await this.miniFilmStore.fetchMovieDetails(id);
    },
  };
  </script>
  