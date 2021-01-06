<template>
  <section class="container">
    <h2>{{ user.name }}</h2>
    <h3>{{ user.age }}</h3>
    <button @click="setNewAge">Change Age</button>
  </section>
</template>

<script>
  import { reactive } from 'vue';

  export default {
    setup() {
      // const age = ref(37);
      const user = reactive({
        name: 'Paul',
        age: 37,
      });

      function setNewAge() {
        user.age = 38;
      }

      // setTimeout(() => {
      //   user.name = 'Tall Paul';
      // }, 2000);

      return {
        user,
        setNewAge,
      };
    },
    // data() {
    //   return {
    //     userName: 'Maximilian',
    //     age: 38
    //   };
    // },
    // methods: {
    //   setNewAge() {
    //     this.age = 38
    //   }
    // }
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
  }

  body {
    margin: 0;
  }

  .container {
    margin: 3rem auto;
    max-width: 30rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    text-align: center;
  }
</style>
