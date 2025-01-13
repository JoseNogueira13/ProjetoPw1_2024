<template>
  <main>
    <div v-if="loading">Loading mini films...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="film in miniFilms" :key="film.id" class="film">
        <img :src="film.image" :alt="film.title" />
        <h2>{{ film.title }}</h2>
        <p>{{ film.description }}</p>
        <button @click="seeMore(film.id)">See More</button>
      </div>
    </div>
  </main>
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
    loading() {
      return this.miniFilmStore.loading;
    },
    error() {
      return this.miniFilmStore.error;
    },
  },
  methods: {
    seeMore(id) {
      console.log("Navigating to event:", id); // Debug
      this.$router.push({ name: "event", params: { id } });
    },
  },
};
</script>

<style>
.film {
  margin-bottom: 20px;
}
.film img {
  max-width: 100px;
  margin-right: 10px;
}
.film h2 {
  font-size: 1.2rem;
}
</style>

<!-- <script>
  import { mapState, mapActions } from 'pinia';
  import { useMiniFilmStore } from "../stores/filmStore.js"
  export default {
    data() {
      return {
        filmeStore: useMiniFilmStore()
      }
    },
    computed: {
      filmes() {
        return this.filmeStore.getFilmes
      }
    },
  }
</script>

<template>
    <div>
        <h1>Event Calender</h1>
        <p>Here you can find all the events that are happening in the festival.</p>
    </div>

  <v-container>
    <v-row> -->
<!-- Iterando sobre os filmes da store -->
<!-- <v-col
        v-for="filme in filmes"
        :key="filme.idFilm"
        cols="4"
      >
        <v-card class="mx-auto" max-width="1400"> -->
<!-- Título do Filme -->
<!-- <v-card-title>{{ filme.nome }}</v-card-title> -->

<!-- Gênero e Faixa Etária -->
<!-- <v-card-subtitle class="text-gray-500">
            {{ filme.genero }} - {{ filme.faixaEtaria }}+
          </v-card-subtitle> -->

<!-- Detalhes do Filme -->
<!-- <v-card-text>
            <div><strong>Duração:</strong> {{ filme.duracao }} minutos</div>
            <div><strong>Diretor:</strong> {{ filme.diretor }}</div>
          </v-card-text> -->

<!-- Botões de Ação -->
<!--<v-card-actions>
            <router-link
              :to="{ name: 'filmeDetalhes', params: { id: filme.idFilm } }"
            >
              <v-btn text>Ver Mais</v-btn>
            </router-link>
            <v-btn color="red" text @click="removerFilme(filme.idFilm)">
              Remover
            </v-btn>
          </v-card-actions>-->
<!-- </v-card>
      </v-col>
    </v-row>
  </v-container>
</template> -->
