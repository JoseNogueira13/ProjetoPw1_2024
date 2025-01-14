<template>
    <main>
      <h2>Your Film Calendar</h2>
  
      <div v-if="calendarFilms.length">
        <div v-for="film in calendarFilms" :key="film.id" class="film-card">
          <img :src="film.image" :alt="film.title" />
          <h3>{{ film.title }}</h3>
          <p>{{ film.description }}</p>
          <p>Status: {{ film.seen ? "Seen" : "Not Seen" }}</p>
          <button @click="markAsSeen(film.id)" :disabled="film.seen">
            Mark as Seen
          </button>
          <button @click="removeFilm(film.id)">Remove</button>
        </div>
      </div>
  
      <div v-else>
        <p>No films in your calendar.</p>
      </div>
    </main>
  </template>

<script>
import { useUserStore } from "@/stores/userStore";
import { useMiniFilmStore } from "@/stores/moviesStore";

export default {
  data() {
    return {
      userStore: useUserStore(),
      miniFilmStore: useMiniFilmStore(),
    };
  },
  computed: {
  calendarFilms() {
    return this.userStore.getUserCalendar.map((calendarItem) => {
      const film = this.miniFilmStore.miniFilms.find(
        (film) => film.id === calendarItem.filmId.id
      );
      if (film) {
        return { ...film, seen: calendarItem.seen };
      } else {
        return null;
      }
    })
  },
},
  methods: {
    markAsSeen(filmId) {
      this.userStore.markFilmAsSeen(filmId);
    },
    removeFilm(filmId) {
      this.userStore.removeFromCalendar(filmId);
    },
  },
  created() {
    if (this.miniFilmStore.miniFilms.length === 0) {
      this.miniFilmStore.fetchMiniFilms();
    }
  },
};
</script>

<style scoped>
.film-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  display: inline-block;
  text-align: center;
  width: 200px;
}
.film-card img {
  width: 100%;
  height: auto;
}
</style>
