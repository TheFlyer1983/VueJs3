<template>
  <section class="container">
    <h2>{{ uName }}</h2>
    <h3>{{ uAge }}</h3>
    <button @click="setNewAge">Change Age</button>
    <div>
      <input type="text" placeholder="First Name" v-model="firstName" />
      <!-- <input type="text" placeholder="Last Name" v-model="lastName" /> -->
      <input type="text" placeholder="Last Name" ref="lastNameInput" />
      <button @click="setLastName">Set Last Name</button>
    </div>
  </section>
</template>

<script>
  import { ref, /*reactive,*/ computed, watch } from 'vue';

  export default {
    setup() {
      const uAge = ref(37);
      const firstName = ref('');
      const lastName = ref('');
      const lastNameInput = ref(null);
      // const user = reactive({
      //   name: 'Paul',
      //   age: 37,
      // });

      const uName = computed(() => {
        return firstName.value + ' ' + lastName.value;
      });

      watch([uAge, uName], (newvalue, oldvalue) => {
        console.log('Old age:', oldvalue[0]);
        console.log('New age:', newvalue[0]);
      });

      function setNewAge() {
        uAge.value = 38;
      }

      function setLastName() {
        lastName.value = lastNameInput.value.value;
      }

      // function setFirstName(event) {
      //   firstName.value = event.target.value;
      // }

      // function setLastName(event) {
      //   lastName.value = event.target.value;
      // }

      // setTimeout(() => {
      //   user.name = 'Tall Paul';
      // }, 2000);

      return {
        uName,
        uAge,
        setNewAge,
        firstName,
        lastNameInput,
        setLastName,
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
