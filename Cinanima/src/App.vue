<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app>
      <v-toolbar-title>Plataforma de Curtas Animados</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Login</v-btn>
      <v-btn text>Cadastro</v-btn>
    </v-app-bar>

    <v-container class="main-layout" fluid>
      <v-navigation-drawer app permanent>
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-filmstrip</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Explorar Curtas</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-calendar</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Eventos</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-container>

    <!-- Main Content -->
    <v-main class="fill-height">
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
  overflow: hidden;
  background-color: #f4f4f9;
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
  overflow: hidden;
}

.content-container {
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 64px; /* Ajusta o espaço para o footer */
}

/* Rodapé */
.v-footer {
  z-index: 2;
  position: relative;
  background-color: #fff;
}
</style>
