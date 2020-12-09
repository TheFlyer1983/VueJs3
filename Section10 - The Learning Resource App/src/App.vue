<template>
  <div>
    <ul>
      <resource-item
        v-for="resource in storedResources"
        :key="resource.id"
        :resource="resource"
      ></resource-item>
    </ul>
  </div>
</template>

<script>
  import ResourceItem from './components/learning-resources/ResourceItem.vue';

  export default {
    components: {
      ResourceItem,
    },
    data() {
      return {
        storedResources: [
          {
            id: 'official-guide',
            title: 'Official Guide',
            description: 'The official Vue.js documentation.',
            link: 'https://vuejs.org',
          },
          {
            id: 'goolge',
            title: 'Google',
            description: 'Learn to google...',
            link: 'https://google.com',
          },
        ],
      };
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');

  * {
    box-sizing: border-box;
  }
  html {
    font-family: 'Roboto', sans-serif;
  }
  body {
    margin: 0;
  }
</style>