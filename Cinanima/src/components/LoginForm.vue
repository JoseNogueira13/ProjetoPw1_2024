<template>
    <div>
      <h2>Log In</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email:</label>
          <input v-model="form.email" id="email" type="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="form.password" id="password" type="password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useUserStore } from '@/stores/userStore';
  
  export default {
    setup() {
      const router = useRouter();
      const route = useRoute();
      const userStore = useUserStore();
      const form = ref({ email: '', password: '' });
      const error = ref(null);
  
      const handleLogin = async () => {
        try {
          userStore.login(form.value);
          const redirectTo = route.query.from || '/';
          router.push(redirectTo);
        } catch (err) {
          error.value = err.message;
        }
      };
  
      return { form, handleLogin, error };
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  