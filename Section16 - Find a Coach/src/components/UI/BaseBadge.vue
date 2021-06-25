<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'BaseBadge',
    props: ['type', 'title'],
    setup(props) {
      const text = computed(() => props.title.toUpperCase());

      return { text }
    },
  });
</script>

<style scoped>
  .badge {
    background-color: #ccc;
    color: #252525;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    display: inline-block;
    margin-right: 0.5rem;
  }
  .frontend {
    background-color: #3d008d;
    color: white;
  }
  .backend {
    background-color: #71008d;
    color: white;
  }
  .career {
    background-color: #8d006e;
    color: white;
  }
</style>
