<template>
  <section>
    <header>
      <h1>Assignment 06</h1>
    </header>
    <div class="components">
      <div class="component">
        <h1>Active User</h1>
        <active-user :user="user"></active-user>
      </div>
      <div class="component">
        <h1>User Data</h1>
        <user-data @update-user="updateUser"></user-data>
      </div>
    </div>
  </section>
</template>

<script>
  import ActiveUser from './components/ActiveUser.vue';
  import UserData from './components/UserData.vue';

  export default {
    components: {
      'active-user': ActiveUser,
      'user-data': UserData,
    },
    data() {
      return {
        user: {
          name: 'Paul',
          age: 37,
        },
      };
    },
    methods: {
      updateUser(user) {
        this.user.name = user.name;
        this.user.age = +user.age;
      },
    },
  };
</script>

<style>
  body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  header {
    background-color: lightcoral;
    padding: 1rem;
  }
  header h1 {
    font-size: 3rem;
  }
  h1 {
    text-align: center;
  }
  .components {
    display: flex;
    justify-content: space-evenly;
  }
</style>
