<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Lista de Filmes</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="films"
              item-value="idFilm"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Filmes</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useFilmStore } from "@/stores/filmStore";

export default {
  data() {
    return {
      filmStore: useFilmStore(),
      headers: [
        { text: "ID", value: "idFilm" },
        { text: "Nome", value: "name" },
        { text: "Gênero", value: "genre" },
        { text: "Duração (min)", value: "duration" },
        { text: "Classificação", value: "ageRating" },
        { text: "Diretor", value: "director" },
      ],
    };
  },
  computed: {
    films() {
      return this.filmStore.getFilms;
    },
  },
  methods: {
    // Methods vazios
  },
};
</script>

<style scoped>
.v-toolbar-title {
  font-weight: bold;
}
</style>
