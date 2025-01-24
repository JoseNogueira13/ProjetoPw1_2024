<template>
  <v-main>
    <v-container>
      <!-- Card do Filme -->
      <v-row justify="center" class="mb-5">
        <v-col cols="12">
          <v-card outlined class="movie-card">
            <v-row>
              <!-- Imagem do Filme (à esquerda, ocupa metade da tela) -->
              <v-col cols="12" md="6" class="d-flex justify-center">
                <v-img :src="movie.image" :alt="movie.title" height="auto" class="movie-image"></v-img>
              </v-col>

              <!-- Detalhes do Filme (à direita, ocupa metade da tela) -->
              <v-col cols="12" md="6">
                <v-card-title class="text-h5">{{ movie.title }}</v-card-title>
                <v-card-subtitle>
                  <p><strong>Release Date:</strong> {{ movie.releaseDate }}</p>
                  <p><strong>Rating:</strong> {{ movie.rating }}</p>
                  <p v-if="movie.director">
                    <strong>Director:</strong>
                    <v-btn text color="primary" @click="goToArtistProfile(movie.director.id)">
                      {{ movie.director.name }}
                    </v-btn>
                  </p>
                  <p v-if="movie.cast && movie.cast.length">
                    <strong>Cast:</strong>
                    <v-row class="cast-row">
                      <v-col cols="auto" v-for="cast in movie.cast" :key="cast.id" class="cast-row cast-col">
                        <v-btn text color="secondary" class="cast-btn" @click="goToArtistProfile(cast.id)">
                          {{ cast.name }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </p>

                </v-card-subtitle>

                <v-card-text>{{ movie.description }}</v-card-text>
                <p>
                  <strong>Likes:</strong> {{ movie.likes || 0 }}
                  <v-btn text color="success" :disabled="isLiked" @click="likeMovie(movie.id)">
                    {{ isLiked ? "Liked" : "Like" }}
                  </v-btn>
                </p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Seção de Comentários -->
      <v-row justify="center">
        <v-col cols="12">
          <v-card outlined>
            <v-card-title>Comments</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="comment in movieComments" :key="comment.id" class="comment-item">
                  <v-list-item-content>
                    <v-list-item-title>
                      <strong>{{ comment.username }}</strong>
                      <small>{{ comment.time }}</small>
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-textarea outlined dense label="Add a comment" v-model="newComment" class="mt-4"></v-textarea>
              <v-btn color="primary" class="mt-2" @click="postComment" :disabled="!newComment">
                Post Comment
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
      newComment: "",
    };
  },
  computed: {
    movie() {
      return this.miniFilmStore.getCurrentMovie;
    },
    loading() {
      return this.miniFilmStore.getLoading;
    },
    error() {
      return this.miniFilmStore.getError;
    },
    isLiked() {
      return this.userStore.getLikedMovies.includes(this.movie.id);
    },
    movieComments() {
      return this.miniFilmStore.comments[this.movie.id] || [];
    },
  },
  methods: {
    likeMovie(id) {
      this.miniFilmStore.likeMovie(id);
    },
    postComment() {
      const username = this.userStore.user.name;
      const time = new Date().toLocaleString();

      const comment = {
        id: Date.now(),
        username,
        time,
        text: this.newComment,
      };

      this.miniFilmStore.addComment(this.movie.id, comment);

      this.newComment = "";
    },
    goToArtistProfile(id) {
      this.$router.push({ name: "artistProfile", params: { id } });
    },
  },
  async created() {
    const id = this.$route.params.id;
    await this.miniFilmStore.fetchMovieDetails(id);
  },
};
</script>

<style scoped>
.v-main {
  margin-left: 0 !important;
  padding-left: 0 !important;
}

.movie-image {
  width: 100%;
  /* Faz com que a imagem ocupe toda a largura disponível */
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding: 8px 0;
}

.v-btn {
  margin: 5px;
}

.cast-row {
  display: inline-flex;
  /* Mantém os itens em linha */
  flex-wrap: wrap;
  /* Permite que os itens quebrem para a próxima linha */
  align-items: center;
  /* Alinha verticalmente no centro */
  padding-top: 10px;
  margin: 1px;
}

.cast-row.cast-col {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 5px;
}
</style>
