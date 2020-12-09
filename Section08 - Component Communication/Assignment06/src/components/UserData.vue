<template>
  <form @submit.prevent="addUser">
    <div>
      <label>Name: </label>
      <input type="text" v-model="enteredName" />
      <div class="error" v-if="error">{{ error }}</div>
    </div>
    <div>
      <label>Age: </label>
      <input type="number" v-model="enteredAge" />
      <div class="error" v-if="error">{{ error }}</div>
    </div>
    <div>
      <button>Update User</button>
    </div>
  </form>
</template>

<script>
  export default {
    emit: ['update-user'],
    data() {
      return {
        enteredName: '',
        enteredAge: '',
        error: '',
      };
    },
    methods: {
      addUser() {
        if (this.enteredName && this.enteredAge) {
          const user = {
            name: this.enteredName,
            age: this.enteredAge,
          };
          this.$emit('update-user', user);
          this.error = '';
        } else {
          this.error = 'You need to have some input';
        }
      },
    },
  };
</script>

<style scoped>
  /* h1 {
    text-align: center;
  } */
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
    background-color: lightpink;
  }
  form div {
    margin: 1rem 0;
  }
  label {
    display: inline-block;
    width: 7rem;
    margin-right: 1rem;
  }
  form button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid lightblue;
    background-color: lightblue;
  }
  .error {
    color: red;
    font-size: 0.7rem;
    margin-top: 0;
  }
</style>
