<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
    </div>
    <div class="actions">
      <base-button link :to="coachContactLink" mode="outline">Contact</base-button>
      <base-button link :to="coachDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'CoachItem',
    props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
    setup(props) {
      const route = useRoute();

      const fullName = computed(() => `${props.firstName} ${props.lastName}`);

      const coachDetailsLink = computed(() => `${route.path}/${props.id}`);

      const coachContactLink = computed(() => `${coachDetailsLink.value}/contact`);

      return { fullName, coachDetailsLink, coachContactLink };
    },
  });
</script>

<style scoped>
  li {
    margin: 1rem 0;
    border: 1px solid #424242;
    border-radius: 12px;
    padding: 1rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h3,
  h4 {
    margin: 0.5rem 0;
  }
  div {
    margin: 0.5rem 0;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
</style>
