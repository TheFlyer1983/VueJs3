<template>
  <div class="user-data">
    <h2>Name: {{ user.name }}</h2>
    <h3>Age: {{ user.age }}</h3>
  </div>
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .user-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: lightgreen;
    padding: 2rem;
  }

  /* .user-data h2,
  .user-data h3 {
    
  } */
</style>
