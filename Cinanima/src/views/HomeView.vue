<template>
  <v-main>
    <!-- Carrossel -->
    <v-row>
      <v-col cols="12">
        <v-carousel>
          <v-carousel-item v-for="(item, i) in miniFilms" :key="i">
            <v-img :src="item.image" :alt="item.title" ></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <!-- Filmes Curtos -->
    <v-row>
      <v-col cols="12" md="4" v-for="short in shortFilms" :key="short.id">
        <v-card class="film-card">
          <v-img :src="short.image" height="200px" :lazy-src="short.image" />
          <v-card-title>{{ short.title }}</v-card-title>
          <v-card-text>{{ short.description }}</v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="seeMore(short.id)">Assistir</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { useMiniFilmStore } from "@/stores/moviesStore.js";

export default {
  data() {
    return {
      miniFilmStore: useMiniFilmStore(),
    };
  },
  created() {
    this.miniFilmStore.fetchMiniFilms();
  },
  computed: {
    miniFilms() {
      return this.miniFilmStore.getMiniFilms;
    },
    shortFilms() {
      return this.miniFilmStore.getMiniFilms;
    },
  },
  methods: {
    seeMore(id) {
      console.log('Navigating to event:', id);
      this.$router.push({ name: 'event', params: { id } });
    }
  }
};
</script>

<style scoped>
 .v-main {
    padding-left: 0; /* Ajusta a altura do container para ocupar toda a tela */
  }
.v-img {
  object-fit: cover;
}

.film-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box; /* Inclui padding e borda no tamanho total do card */
}

.film-card v-card-title,
.film-card v-card-text {
  height: 100%; /* Assegura que o conteúdo do card tenha a altura correta */
}

.v-row {
  display: flex;
  justify-content: space-between;
}

.v-col {
  display: flex;
  justify-content: stretch; /* Garante que os cards ocupem o mesmo espaço */
}

.v-card {
  height: 100%; /* Garante que todos os cards terão altura igual */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ajusta o conteúdo do card para ocupar o máximo de espaço */
}
</style>
