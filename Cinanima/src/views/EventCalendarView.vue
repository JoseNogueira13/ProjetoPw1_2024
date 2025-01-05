<script>
import { mapState, mapActions } from 'pinia';
import { useMoviesStore } from "@/stores/moviesStore";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useMoviesStore, ['movies', 'loading', 'error']),
  },
  methods: {
    ...mapActions(useMoviesStore, ['fetchMovies']),
  },
  created() {
    this.fetchMovies();
  },
};
</script>

<template>
  <main>
    <div v-if="loading">Loading movies...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="movie in movies" :key="movie.title" class="movie">
        <img :src="movie.image" :alt="movie.title" />
        <h2>{{ movie.id }}</h2>
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.description }}</p>
      </div>
    </div>
  </main>
</template>

<style>
.movie {
  margin-bottom: 20px;
}
.movie img {
  max-width: 100px;
  margin-right: 10px;
}
.movie h2 {
  font-size: 1.2rem;
}
</style>





<!-- <script>
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
