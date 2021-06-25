<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';

  import { routerPaths } from '@/router/router-paths';

  export default defineComponent({
    name: 'CoachesDetail',
    props: ['id'],
    setup(props) {
      const store = useStore();
      const route = useRoute();

      const selectedCoach = computed(() =>
        store.getters['coaches/coaches'].find((coach: { id: any }) => coach.id === props.id)
      );

      const fullName = computed(
        () => `${selectedCoach.value.firstName} ${selectedCoach.value.lastName}`
      );

      const contactLink = computed(() => `${route.path}/${routerPaths.contact.path}`);
      const areas = computed(() => selectedCoach.value.areas);
      const rate = computed(() => selectedCoach.value.hourlyRate);
      const description = computed(() => selectedCoach.value.description);

      return { selectedCoach, fullName, contactLink, areas, rate, description };
    },
  });
</script>
