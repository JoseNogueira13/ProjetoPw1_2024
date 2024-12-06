<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="name">Name:</label>
          <input v-model="form.name" id="name" type="text" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="form.email" id="email" type="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="form.password" id="password" type="password" required />
        </div>
        <button type="submit">Register</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  
  export default {
    setup() {
      const userStore = useUserStore();
      const form = ref({ name: '', email: '', password: '' });
      const error = ref(null);
  
      const handleRegister = async () => {
        try {
          userStore.register(form.value);
          alert('Registration successful! Please log in.');

        } catch (err) {
          error.value = err.message;
        }
      };
  
      return { form, handleRegister, error };
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  