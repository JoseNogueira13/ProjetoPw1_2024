<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app>
      <v-toolbar-title>Plataforma de Curtas Animados</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Login</v-btn>
      <v-btn text>Cadastro</v-btn>
    </v-app-bar>

    <!-- Navigation Bar -->
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

    <!-- Main Content -->
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-carousel>
              <v-carousel-item v-for="(item, i) in carouselItems" :key="i">
                <v-img :src="item.src"></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4" v-for="short in shortFilms" :key="short.id">
            <v-card>
              <v-img :src="short.poster" height="200px"></v-img>
              <v-card-title>{{ short.title }}</v-card-title>
              <v-card-text>{{ short.description }}</v-card-text>
              <v-card-actions>
                <v-btn text color="primary">Assistir</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-container>
        <v-row>
          <v-col class="text-center"> © 2025 - Plataforma de Curtas Animados </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      carouselItems: [
        { src: "https://via.placeholder.com/800x400?text=Curta+1" },
        { src: "https://via.placeholder.com/800x400?text=Curta+2" },
        { src: "https://via.placeholder.com/800x400?text=Curta+3" },
      ],
      shortFilms: [
        {
          id: 1,
          title: "Curta Animado 1",
          description: "Uma história incrível em poucos minutos.",
          poster: "https://via.placeholder.com/300x400?text=Poster+1",
        },
        {
          id: 2,
          title: "Curta Animado 2",
          description: "A aventura de uma vida condensada.",
          poster: "https://via.placeholder.com/300x400?text=Poster+2",
        },
        {
          id: 3,
          title: "Curta Animado 3",
          description: "Emocionante e único.",
          poster: "https://via.placeholder.com/300x400?text=Poster+3",
        },
      ],
    };
  },
};
</script>

<style>
.v-navigation-drawer {
  width: 200px;
}
</style>
