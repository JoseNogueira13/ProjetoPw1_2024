<template>
  <v-main>
    <v-container>
      <!-- Card do Diretor -->
      <v-row justify="center" class="mb-4">
        <v-col cols="12" md="8">
          <v-card outlined class="director-card">
            <v-row>
              <!-- Imagem do Diretor -->
              <v-col cols="12" md="4" class="d-flex justify-center align-center">
                <v-img
                  v-if="director && director.profile_path"
                  :src="`${IMAGE_BASE_URL}${director.profile_path}`"
                  :alt="director.name"
                  width="150"
                  height="150"
                  class="rounded-circle"
                ></v-img>
                <!-- Placeholder se não houver profile_path -->
                <v-img
                  v-else
                  :src="`https://eu.ui-avatars.com/api/?name=${director.name}&size=250`"
                  :alt="'Placeholder Image'"
                  class="rounded-circle"
                ></v-img>
              </v-col>

              <!-- Detalhes do Diretor -->
              <v-col cols="12" md="8">
                <v-card-title class="text-h6">{{ director.name }}</v-card-title>
                <v-card-subtitle>
                  <p><strong>Popularity:</strong> {{ director.popularity }}</p>
                </v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Lista de Elenco -->
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card outlined>
            <v-card-title class="text-h6">Cast</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="actor in cast" :key="actor.id" class="mb-3">
                  <v-card outlined>
                    <v-img
                      :src="`${IMAGE_BASE_URL}${actor.profile_path}`"
                      :alt="actor.name"
                      height="120"
                      class="actor-image"
                      v-if="actor.profile_path"
                    ></v-img>
                    <v-card-text>
                      <p class="text-center">
                        <strong>{{ actor.name }}</strong>
                        <br />
                        as {{ actor.character }}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <div v-if="!cast || cast.length === 0">
                <p>No cast information available.</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { useMiniFilmStore } from "@/stores/moviesStore.js";

export default {
  data() {
    return {
      miniFilmStore: useMiniFilmStore(),
      IMAGE_BASE_URL: "https://image.tmdb.org/t/p/w500",
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

<style scoped>
.v-main {
  margin-left: 0 !important;
  padding-left: 0 !important;
}

.director-card {
  padding: 20px;
}

.rounded-circle {
  border-radius: 50%;
  object-fit: cover;
}

.actor-image {
  width: 100%;
  border-radius: 8px;
}

.text-center {
  text-align: center;
}
</style>
