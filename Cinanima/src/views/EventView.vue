<template>
  <div v-if="loading">Loading movie details...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="movie">
    <h1>{{ movie.title }}</h1>
    <img :src="movie.image" :alt="movie.title" />
    <p>{{ movie.description }}</p>
    <p><strong>Release Date:</strong> {{ movie.releaseDate }}</p>
    <p><strong>Rating:</strong> {{ movie.rating }}</p>

    <p>
      <strong>Likes:</strong> {{ movie.likes || 0 }}
      <button 
        @click="likeMovie(movie.id)" :disabled="isLiked">{{ isLiked ? "Liked" : "Like" }}
      </button>
    </p>

    <section class="comments">
      <h2>Comments</h2>

      <form @submit.prevent="postComment">
        <input 
          v-model="newComment" 
          type="text" 
          placeholder="Add a comment" 
          required 
        />
        <button type="submit">Post Comment</button>
      </form>

      <ul>
        <li v-for="comment in movieComments" :key="comment.id">
          <strong>{{ comment.username }}</strong> 
          <small>({{ comment.time }})</small>
          <p>{{ comment.text }}</p>
        </li>
      </ul>
    </section>

  </div>
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
  },
  async created() {
    const id = this.$route.params.id;
    await this.miniFilmStore.fetchMovieDetails(id);
  },
};
</script>
