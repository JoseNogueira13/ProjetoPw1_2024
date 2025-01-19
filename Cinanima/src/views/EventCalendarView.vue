<template>
  <v-main>
    <!-- Carregamento -->
    <div v-if="loading">Loading mini films...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <v-row>
        <!-- Exibição de um filme por linha -->
        <v-col v-for="film in miniFilms" :key="film.id" cols="12">
          <v-card class="film-card" outlined>
            <v-row align="center">
              <!-- Imagem à esquerda -->
              <v-col cols="4">
                <v-img :src="film.image" height="150px" contain></v-img>
              </v-col>

              <!-- Descrição no meio -->
              <v-col cols="5">
                <v-card-title>{{ film.title }}</v-card-title>
                <v-card-text>{{ film.description }}</v-card-text>
              </v-col>

              <!-- Botões de ação à direita -->
              <v-col cols="3" class="d-flex flex-column justify-center">
                <v-btn text color="primary" @click="seeMore(film.id)" class="mb-2">See More</v-btn>
                <v-btn text color="secondary" @click="addToCalendar(film.id)">Add to Calendar</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script>
import { useMiniFilmStore } from "@/stores/moviesStore.js";
import { useUserStore } from "@/stores/userStore.js";

export default {
  data() {
    return {
      miniFilmStore: useMiniFilmStore(),
      userStore: useUserStore(),
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
      console.log('Navigating to event:', id); // Debug
      this.$router.push({ name: 'event', params: { id } });
    },
    addToCalendar(filmId) {
      this.userStore.addToCalendar(filmId);
    },
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

.film-card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.film-card-text {
  font-size: 1rem;
  color: #555;
}

.film-card-actions {
  display: flex;
  justify-content: flex-start;
}

.film-card-actions .v-btn {
  margin-right: 10px;
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
