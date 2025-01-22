<script>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/userStore.js";

export default {
  data() {
    return {
      userStore: useUserStore(),
    };
  },
  created() {
    //console.log(this.userStore.isAuthenticated)
  },
  computed: {
    isAuthenticated() {
      return this.userStore?.isUserAuthenticated
    },
    userName() {
      return this.userStore?.user.name
    },
  },
}
</script>

<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app>
      <v-toolbar-title>Plataforma de Curtas Animados</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="isAuthenticated">
        <v-btn text disabled>Olá, {{ userName }}</v-btn>
      </template>
      <template v-else>
        <v-btn>
          <RouterLink :to="{ name: 'authentication' }" class="nav-link">Login/Registro</RouterLink>
        </v-btn>
      </template>
    </v-app-bar>

    <v-container class="main-layout" fluid>
      <v-navigation-drawer app permanent>
        <v-list>
          <v-list-item-group>
            <!-- Home -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
              </v-list-item-title>
            </v-list-item>

            <!-- Authentication -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-lock</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'authentication' }" class="nav-link">Authentication</RouterLink>
              </v-list-item-title>
            </v-list-item>

            <!-- Exclusive Content -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-filmstrip</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'exclusiveContent' }" class="nav-link">Exclusive Content</RouterLink>
              </v-list-item-title>
            </v-list-item>

            <!-- Artist Profile -->
            <v-list-item v-if="directorId">
              <v-list-item-icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'artistProfile', params: { directorId: directorId } }" class="nav-link">
                  Artist Profile
                </RouterLink>
              </v-list-item-title>
            </v-list-item>

            <!-- Event Calendar -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-calendar</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'eventCalendar' }" class="nav-link">Event Calendar</RouterLink>
              </v-list-item-title>
            </v-list-item>

            <!-- Ticket -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-ticket</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'ticket' }" class="nav-link">Ticket</RouterLink>
              </v-list-item-title>
            </v-list-item>

            <!-- Event with ID -->
            <v-list-item v-if="someId">
              <v-list-item-icon>
                <v-icon>mdi-calendar-check</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'event', params: { id: someId } }" class="nav-link">Event</RouterLink>
              </v-list-item-title>
            </v-list-item>

            <!-- User Profile -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'userProfile' }" class="nav-link">Profile</RouterLink>
              </v-list-item-title>
            </v-list-item>

            <!-- Partners -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-handshake</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'partners' }" class="nav-link">Partners</RouterLink>
              </v-list-item-title>
            </v-list-item>

            <!-- About -->
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-information</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
              </v-list-item-title>
            </v-list-item>

            <!-- Test Page -->
            <!--
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-test-tube</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                <RouterLink :to="{ name: 'testPage' }" class="nav-link">TestPage</RouterLink>
              </v-list-item-title>
            </v-list-item>
            -->

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-container>

    <!-- Main Content -->
    <v-main fluid class="fill-height">
      <div class="content-container">
        <RouterView />
      </div>
    </v-main>

    <!-- Footer -->
    <v-footer app class="footer">
      <v-container>
        <v-row>
          <v-col class="text-center"> © 2025 - Plataforma de Curtas Animados </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>

</template>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: #f4f4f9;
  overflow: hidden;
}

.v-app {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.v-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;

}

.content-container {
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 50px;
  /* A altura do rodapé */
}

.v-footer {
  z-index: 2;
  position: relative;
  background-color: #fff;
  height: 50px;
  /* Altura do rodapé */
  width: 100%;
  /* Garante que o rodapé ocupe toda a largura da tela */
}

.nav-link {
  text-decoration: none;
  color: inherit;
}

.nav-link:hover {
  color: #007bff;
  /* Cor ao passar o mouse */
}
</style>
