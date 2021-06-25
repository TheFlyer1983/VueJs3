<template>
  <section>
    <base-card>
      <h2>Page not found</h2>
      <p>
        This page could not be found - maybe check out all our
        <router-link :to="routerPaths.coaches.path">coaches</router-link>
      </p>
    </base-card>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { routerPaths } from '@/router/router-paths';

  export default defineComponent({
    name: 'Not Found',
    setup() {
      return {routerPaths}
    }
  });
</script>

<style></style>
