<template>
    <div v-if="loading">Loading director details...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="director">
      <h1>{{ director.name }}</h1>
      <img :src="`${IMAGE_BASE_URL}${director.profile_path}`" alt="Director's profile" v-if="director.profile_path"/>
      <p><strong>Popularity:</strong> {{ director.popularity }}</p>
  
      <h2>Cast:</h2>
      <div v-if="cast && cast.length > 0">
        <ul>
          <li v-for="actor in cast" :key="actor.id">
            <img :src="`${IMAGE_BASE_URL}${actor.profile_path}`" alt="Actor's profile" v-if="actor.profile_path" width="50"/>
            <span>{{ actor.name }} as {{ actor.character }}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No cast information available.</p>
      </div>
    </div>
  </template>
  

  <script>
  import { useMiniFilmStore } from "@/stores/moviesStore.js";
  
  export default {
    data() {
      return {
        miniFilmStore: useMiniFilmStore(),
        IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
      };
    },
    computed: {
      director() {
        return this.miniFilmStore.getCurrentMovie.director;
      },
      cast() {
        return this.miniFilmStore.getCurrentMovie.cast;
      },
      loading() {
        return this.miniFilmStore.getLoading;
      },
      error() {
        return this.miniFilmStore.getError;
      },
    },
  };
  </script>
  
