<script>
  import { useFilmStore } from "../stores/filmStore.js"
  export default {
    data() {
      return {
        filmeStore: useFilmStore()
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
    <v-row>
      <!-- Iterando sobre os filmes da store -->
      <v-col
        v-for="filme in filmes"
        :key="filme.idFilm"
        cols="4"
      >
        <v-card class="mx-auto" max-width="1400">
          <!-- Título do Filme -->
          <v-card-title>{{ filme.nome }}</v-card-title>

          <!-- Gênero e Faixa Etária -->
          <v-card-subtitle class="text-gray-500">
            {{ filme.genero }} - {{ filme.faixaEtaria }}+
          </v-card-subtitle>

          <!-- Detalhes do Filme -->
          <v-card-text>
            <div><strong>Duração:</strong> {{ filme.duracao }} minutos</div>
            <div><strong>Diretor:</strong> {{ filme.diretor }}</div>
          </v-card-text>

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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
