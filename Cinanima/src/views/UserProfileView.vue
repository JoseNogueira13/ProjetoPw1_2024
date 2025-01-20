<template>
  <v-main>
    <h2>Your Film Calendar</h2>

    <!-- Exibição dos filmes na calendarFilms -->
    <div v-if="calendarFilms.length">
      <v-row>
        <v-col v-for="film in calendarFilms" :key="film.id" cols="12">
          <v-card class="film-card" outlined>
            <v-row align="center">
              <!-- Imagem do filme -->
              <v-col cols="4">
                <v-img :src="film.image" height="150px" contain></v-img>
              </v-col>

              <!-- Detalhes do filme -->
              <v-col cols="5">
                <v-card-title>{{ film.title }}</v-card-title>
                <v-card-text>{{ film.description }}</v-card-text>
                <p>Status: {{ film.seen ? "Seen" : "Not Seen" }}</p>
              </v-col>

              <!-- Ações do usuário -->
              <v-col cols="3" class="d-flex flex-column justify-center">
                <v-btn text color="primary" @click="markAsSeen(film.id)" :disabled="film.seen" class="mb-2">
                  Mark as Seen
                </v-btn>
                <v-btn text color="red" @click="removeFilm(film.id)">
                  Remove
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Mensagem caso não haja filmes no calendário -->
    <div v-else>
      <p>No films in your calendar.</p>
    </div>
  </v-main>
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
      return this.userStore.getUserCalendar
        .map((calendarItem) => {
          const film = this.miniFilmStore.miniFilms.find(
            (film) => film.id === calendarItem.filmId
          );
          if (film) {
            return { ...film, seen: calendarItem.seen };
          }
          return null;
        })
        .filter((film) => film !== null); // Remover filmes inexistentes
    },
  },
  methods: {
    markAsSeen(filmId) {
      this.userStore.markFilmAsSeen(filmId);
    },
    removeFilm(filmId) {
      // Remover o filme e atualizar a lista de filmes
      this.userStore.removeFromCalendar(filmId);
    },
  },
  created() {
    if (!this.miniFilmStore.miniFilms.length) {
      this.miniFilmStore.fetchMiniFilms();
    }
  },
};
</script>

<style scoped>
.v-main {
  padding-left: 1%;
  padding-right: 5%;
}

.v-card {
  padding: 5px;
}

.film-card {
  margin-bottom: 20px;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.v-card-text {
  font-size: 1rem;
  color: #555;
}

.v-btn {
  margin-top: 5px;
}
</style>
