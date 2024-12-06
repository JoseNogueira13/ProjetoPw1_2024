<template>
  <div class="auth-view">
    <div>
      <LoginForm v-if="authMode === 'login'" />
      <RegisterForm v-else />
    </div>

    <p>
      <button @click="toggleAuthMode">
        {{ authMode === 'login' ? "Don't have an account? Click here to register" : "Already have an account? Click here to log in" }}
      </button>
    </p>

  </div>
</template>

<script>
import { ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  components: { LoginForm, RegisterForm },
  setup() {
    const authMode = ref('login');

    const toggleAuthMode = () => {
      authMode.value = authMode.value === 'login' ? 'register' : 'login';
    };

    return { authMode, toggleAuthMode };
  },
};
</script>

<style scoped>
.auth-view {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
