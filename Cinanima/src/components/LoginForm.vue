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
      <button type="submit" :disabled="!form.email || !form.password">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore(); // Acessa o Pinia store
    const form = ref({ email: "", password: "" });
    const error = ref(null);

    const handleLogin = async () => {
      error.value = null; // Reset de erros
      try {
        // Realiza o login usando a action definida no store
        userStore.login(form.value.email, form.value.password);

        // Redireciona para a página inicial ou para a rota de origem
        const redirectTo = route.query.from || "/";
        router.push(redirectTo);
      } catch (err) {
        // Exibe o erro retornado pela store
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
