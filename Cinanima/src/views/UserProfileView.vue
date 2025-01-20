<template>
  <v-main>
    <v-container>
      <!-- Área do perfil do usuário -->
      <v-row align="center" class="mb-5">
        <v-col cols="12">
          <v-card class="user-card" outlined>
            <v-row align="center">
              <!-- Avatar do usuário -->
              <v-col cols="4" sm="3">
                <v-avatar size="150">
                  <!-- Acesso seguro ao nome do usuário -->
                  <v-img v-if="userStore.user" :src="`https://eu.ui-avatars.com/api/?name=${userStore.user.name}&size=250`" alt="User Avatar"></v-img>
                </v-avatar>
              </v-col>

              <!-- Detalhes do usuário -->
              <v-col cols="5" sm="6">
                <!-- Exibe apenas se o usuário estiver logado -->
                <v-card-title class="text-h5" v-if="userStore.user">{{ userStore.user.name }}</v-card-title>
                <v-card-text v-if="userStore.user">
                  <p><strong>Email:</strong> {{ userStore.user.email }}</p>
                  <p><strong>Member Since:</strong> {{ userStore.user.memberSince }}</p>
                </v-card-text>
              </v-col>

              <!-- Ações do usuário -->
              <v-col cols="3" sm="3" class="d-flex flex-column justify-center">
                <v-btn text color="primary" @click="editProfile" class="mb-2">
                  Edit Profile
                </v-btn>
                <v-btn text color="red" @click="logout">
                  Logout
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Seção do calendário de filmes -->
      <h2>Your Film Calendar</h2>
      <div v-if="calendarFilms.length">
        <v-row>
          <v-col v-for="film in calendarFilms" :key="film.id" cols="12">
            <v-card class="film-card" outlined>
              <v-row align="center">
                <!-- Imagem do filme -->
                <v-col cols="4">
                  <v-img :src="film.image" height="150px" contain></v-img>
                </v-col>

                <!-- Detalhes do filme -->
                <v-col cols="5">
                  <v-card-title class="text-h6">{{ film.title }}</v-card-title>
                  <v-card-text>
                    {{ film.description }}
                  </v-card-text>
                  <p>Status: {{ film.seen ? "Seen" : "Not Seen" }}</p>
                </v-col>

                <!-- Ações -->
                <v-col cols="3" class="d-flex flex-column justify-center">
                  <v-btn text color="primary" @click="markAsSeen(film.id)" :disabled="film.seen" class="mb-2">
                    Mark as Seen
                  </v-btn>
                  <v-btn text color="red" @click="removeFilm(film.id)">
                    Remove
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Mensagem caso não haja filmes -->
      <div v-else>
        <p>No films in your calendar.</p>
      </div>
    </v-container>
  </v-main>
</template>


<script>
import { useUserStore } from "@/stores/userStore";
import { useMiniFilmStore } from "@/stores/moviesStore";

export default {
  data() {
    return {
      userStore: useUserStore(),
      miniFilmStore: useMiniFilmStore(),
    };
  },
  computed: {
    calendarFilms() {
      return this.userStore.getUserCalendar
        .map((calendarItem) => {
          const film = this.miniFilmStore.miniFilms.find(
            (film) => film.id === calendarItem.filmId
          );
          if (film) {
            return { ...film, seen: calendarItem.seen };
          }
          return null;
        })
        .filter((film) => film !== null); // Remover filmes inexistentes
    },
  },
  methods: {
    markAsSeen(filmId) {
      this.userStore.markFilmAsSeen(filmId);
    },
    removeFilm(filmId) {
      this.userStore.removeFromCalendar(filmId);
    },
    editProfile() {
      console.log("Edit profile clicked");
    },
    async logout() {
      try {
        //console.log("Estado do userStore antes do logout:", this.userStore.user);
        await this.userStore.logout();  // Aguarda o logout ser concluído
        //console.log("Estado do userStore após o logout:", this.userStore.user);

        // Tenta redirecionar para a página "home"
        await this.$router.push({ name: "home" });
        //console.log("Logout clicked");
      } catch (error) {
        //console.error("Erro ao realizar o logout ou redirecionamento:", error);  // Captura o erro e exibe no console
      }
    },
  },
  created() {
    if (!this.miniFilmStore.miniFilms.length) {
      this.miniFilmStore.fetchMiniFilms();
    }
  },
};
</script>


<style scoped>
.v-main {
  padding-left: 2%;
  padding-right: 2%;
}

.user-card {
  margin-bottom: 20px;
  padding: 10px;
}

.film-card {
  margin-bottom: 20px;
}

.v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.v-card-text {
  font-size: 0.9rem;
  color: #555;
}

.v-btn {
  margin: 5px 0;
}

.v-avatar img {
  border-radius: 4px;
}
</style>
