<template>
  <div>
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, watch, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  import TheHeader from './components/layout/TheHeader.vue';

  import { AuthActionTypes } from '@/store/modules/auth/action-types';
  import { routerPaths } from '@/router/router-paths';

  export default defineComponent({
    name: 'App',
    components: {
      TheHeader,
    },
    setup() {
      const store = useStore();
      const router = useRouter();

      onMounted(() => store.dispatch(`auth/${AuthActionTypes.tryLogin}`));

      const didAutoLogout = computed(() => store.getters[`auth/didAutoLogout`]);

      watch(didAutoLogout, (curValue: boolean, oldValue: boolean) => {
        if (curValue && curValue !== oldValue) {
          router.replace(routerPaths.coaches.path);
        }
      });

      return { didAutoLogout };
    },
  });
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  * {
    box-sizing: border-box;
  }
  html {
    font-family: 'Roboto', sans-serif;
  }
  body {
    margin: 0;
  }
  .route-enter-from {
    opacity: 0;
    transform: translateY(-30px);
  }
  .route-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .route-enter-to,
  .route-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  .route-enter-active {
    transition: all 0.3s ease-out;
  }
  .route-leave-active {
    transition: all 0.3s ease-in;
  }
</style>
