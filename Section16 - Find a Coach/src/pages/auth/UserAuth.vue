<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="text" id="email" v-model.trim="loginForm.email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="loginForm.password" />
        </div>
        <p v-if="v$.$invalid && isFormSubmitted">
          Please enter a valid email and password (must be at least 6 characters long).
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">
          {{ switchModeButtonCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter, useRoute } from 'vue-router';
  // import { Login } from '@/types/interfaces';
  import { AuthActions } from '@/store/modules/auth/types';

  import useVuelidate from '@vuelidate/core';
  import { required, minLength, email } from '@vuelidate/validators';

  export default defineComponent({
    name: 'UserAuth',
    setup() {
      const store = useStore();
      const router = useRouter();
      const route = useRoute();

      const loginForm = reactive({
        email: '',
        password: ''
      })

      const isFormSubmitted = ref(false);
      const mode = ref('login');
      const isLoading = ref(false);
      const error = ref(null);

      const rules = {
        email: {required, email},
        password: {required, minLength: minLength(6)}
      }

      const v$ = useVuelidate(rules, loginForm)

      const submitButtonCaption = computed(() => {
        if (mode.value === 'login') {
          return 'Login';
        } else {
          return 'Signup';
        }
      });

      const switchModeButtonCaption = computed(() => {
        if (mode.value === 'login') {
          return 'Signup instead';
        } else {
          return 'Login instead';
        }
      });

      async function submitForm(): Promise<void> {
        isFormSubmitted.value = true;
        if (v$.value.$invalid) {
          return;
        }

        isLoading.value = true;

        const actionPayload = {
          email: loginForm.email,
          password: loginForm.password,
        };
        try {
          if (mode.value === 'login') {
            await store.dispatch(`auth/${AuthActions.login}`, actionPayload);
          } else {
            await store.dispatch(`auth/${AuthActions.signUp}`, actionPayload);
          }
          const redirectUrl = `/${route.query.redirect || 'coaches'}`;
          router.replace(redirectUrl);
        } catch (err) {
          error.value = err.message || 'Failed to authenticate, try later';
        }
        isLoading.value = false;
      }

      function switchAuthMode(): void {
        if (mode.value === 'login') {
          mode.value = 'signup';
        } else {
          mode.value = 'login';
        }
      }

      function handleError(): void {
        error.value = null;
      }

      return {
        loginForm,
        isFormSubmitted,
        mode,
        isLoading,
        error,
        submitButtonCaption,
        switchModeButtonCaption,
        submitForm,
        switchAuthMode,
        handleError,
        v$,
      };
    },
  });
</script>

<style scoped>
  form {
    margin: 1rem;
    padding: 1rem;
  }
  .form-control {
    margin: 0.5rem 0;
  }
  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
  }
  input:focus,
  textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
  }
</style>
