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

              <template v-slot:[`item.actions`]="{ item }">
                <!-- Botões de Editar e Remover -->
                <v-btn color="primary" @click="openEditModal(item)">Editar</v-btn>
                <v-btn color="red" @click="removeFilm(item.idFilm)">Remover</v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal para Edição -->
    <v-dialog v-model="editModal" max-width="500">
      <v-card>
        <v-card-title>Editar Filme</v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <v-text-field v-model="editedFilm.name" label="Nome" required></v-text-field>
            <v-text-field
              v-model="editedFilm.genre"
              label="Gênero"
              required
            ></v-text-field>
            <v-text-field
              v-model="editedFilm.duration"
              label="Duração (min)"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="editedFilm.ageRating"
              label="Classificação"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="editedFilm.director"
              label="Diretor"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeEditModal">Cancelar</v-btn>
          <v-btn color="primary" @click="saveEdit">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useMiniFilmStore } from "@/stores/moviesStore";

export default {
  data() {
    return {
      miniFilmStore: useMiniFilmStore(),
      headers: [
        { text: "ID", value: "idFilm" },
        { text: "Nome", value: "name" },
        { text: "Gênero", value: "genre" },
        { text: "Duração (min)", value: "duration" },
        { text: "Classificação", value: "ageRating" },
        { text: "Diretor", value: "director" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      editModal: false, // Controle do modal de edição
      editedFilm: {}, // Dados do filme que será editado
    };
  },
  computed: {
    films() {
      return this.miniFilmStore.getFilms;
    },
  },
  methods: {
    openEditModal(film) {
      let filmById = this.miniFilmStore.getFilmById(film.idFilm);
      console.table(filmById);
      this.editedFilm = { ...filmById }; // Clona os dados do filme selecionado
      this.editModal = true;
    },
    saveEdit() {
      if (this.$refs.editForm.validate()) {
        this.miniFilmStore.editFilm(this.editedFilm);
        this.closeEditModal();
      }
    },
    closeEditModal() {
      this.editedFilm = {}; // Reseta os dados do filme editado
      this.editModal = false;
    },
    removeFilm(id) {
      if (confirm("Deseja realmente remover este filme?")) {
        this.miniFilmStore.removeFilm(id);
      }
    },
  },
};
</script>

<style scoped>
.v-toolbar-title {
  font-weight: bold;
}
</style>
