<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'authentication' }">Authentication</RouterLink>
        <RouterLink :to="{ name: 'exclusiveContent' }">Exclusive Content</RouterLink>
        <RouterLink :to="{ name: 'artistProfile' }">Artist Profile</RouterLink>
        <RouterLink :to="{name: 'eventCalendar'}">Event Calendar</RouterLink>
        <RouterLink :to="{ name: 'ticket' }">Ticket</RouterLink>
        <RouterLink :to="{ name: 'event' }">Event</RouterLink>
        <RouterLink :to="{ name: 'userProfile' }">Profile</RouterLink>
        <RouterLink :to="{ name: 'partners' }">Partners</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
      </nav>
    </div>
    <RouterView />
  </header>

  
</template>

<style>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0.5rem 1rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
