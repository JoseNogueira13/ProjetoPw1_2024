<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
        <RouterLink :to="{ name: 'authentication' }" class="nav-link"
          >Authentication</RouterLink
        >
        <RouterLink :to="{ name: 'exclusiveContent' }" class="nav-link"
          >Exclusive Content</RouterLink
        >
        <RouterLink :to="{ name: 'artistProfile' }" class="nav-link"
          >Artist Profile</RouterLink
        >
        <RouterLink :to="{ name: 'eventCalendar' }" class="nav-link"
          >Event Calendar</RouterLink
        >
        <RouterLink :to="{ name: 'ticket' }" class="nav-link">Ticket</RouterLink>
        <RouterLink :to="{ name: 'event' }" class="nav-link">Event</RouterLink>
        <RouterLink :to="{ name: 'userProfile' }" class="nav-link">Profile</RouterLink>
        <RouterLink :to="{ name: 'partners' }" class="nav-link">Partners</RouterLink>
        <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
        <RouterLink :to="{ name: 'testPage' }" class="nav-link">TestPage</RouterLink>
      </nav>
    </div>
    <main>
      <RouterView />
    </main>
  </header>
</template>

<style>
:root {
  --color-text: #ffffff;
  --color-primary: #007bff;
  --color-secondary: #0056b3;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  color: #333;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #007bff;
  color: var(--color-text);
}

.wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
}

nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text);
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link.router-link-exact-active {
  font-weight: bold;
  background-color: var(--color-secondary);
}

.nav-link:hover {
  background-color: var(--color-secondary);
  color: #fff;
}

main {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

@media (min-width: 1024px) {
  header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  nav {
    justify-content: flex-start;
  }

  .nav-link {
    margin: 0 1rem;
  }
}
</style>
