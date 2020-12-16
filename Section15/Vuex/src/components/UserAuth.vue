<template>
  <div>
    <button v-if="!isLoggedIn" @click="toggleLogin">Login</button>
    <button v-else @click="toggleLogin">Logout</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: ['isLoggedIn'],
    methods: {
      ...mapActions(['toggleLogin']),
    },
  };
</script>
