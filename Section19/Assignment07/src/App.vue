<template>
  <div>
    <h2>My Course Goal</h2>
    <!-- Task 1: Output your main course goal with help of the composition API -->
    <!-- Don't hardcode it into the template, instead hardcode it into the JS code -->
    <h3 v-if="data.showGoal">{{ data.goal }}</h3>
    <!-- Task 2: Toggle (show/ hide) the goal with help of the button  -->
    <button @click="toggleGoal">Toggle Goal</button>
    <!-- Task 3: Manage data in three ways -->
    <!-- => Separate refs -->
    <!-- => Ref Object -->
    <!-- => Reactive Object -->
    <!-- Task 4: Also solve the assignment with the Options API -->
  </div>
</template>

<script>
  // import { ref } from 'vue';
  import { reactive } from 'vue';

  export default {
    // Composition API
    setup() {
      // Separate Refs
      // const goal = ref('Learn the Composition API');
      // const showGoal = ref(true);

      // Ref Object
      // const data = ref({
      //   goal: 'Learn the CompositionAPI',
      //   showGoal: true,
      // });
      // Reactive Object
      const data = reactive({
        goal: 'Learn the CompositionAPI',
        showGoal: true,
      });

      function toggleGoal() {
        // Separate Refs
        // showGoal.value = !showGoal.value;

        // Ref object
        // data.value.showGoal = !data.value.showGoal;
        
        // Reactive Object
        data.showGoal = !data.showGoal;
      }

      return {
        // Separate Refs
        // goal,
        // showGoal,
        toggleGoal,
        data,
      };
    },

    // Options API
    /*data() {
      return {
        goal: 'Learn the Composition API',
        showGoal: true,
      };
    },
    methods: {
      toggleGoal() {
        this.showGoal = !this.showGoal;
      },
    },*/
  };
</script>

<style>
  html {
    font-family: sans-serif;
  }
  body {
    margin: 3rem;
    text-align: center;
  }
</style>
