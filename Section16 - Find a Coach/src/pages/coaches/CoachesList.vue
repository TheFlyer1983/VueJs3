<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to Register as Coach</base-button
          >
          <base-button link to="/register" v-if="!isCoach && !isLoading && isLoggedIn">
            Register as Coach
          </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';

  import CoachItem from '../../components/coaches/CoachItem.vue';
  import CoachFilter from '../../components/coaches/CoachFilter.vue';
  import { CoachesActionTypes } from '@/store/modules/coaches/action-types';

  export default defineComponent({
    name: 'CoachesList',
    components: {
      CoachItem,
      CoachFilter,
    },
    setup() {
      const store = useStore();

      const isLoading = ref(false);
      const error = ref(null);
      const activeFilters = reactive({
        frontend: true,
        backend: true,
        career: true,
      });

      const isLoggedIn = computed(() => store.getters[`auth/isAuthenticated`]);

      const isCoach = computed(() => store.getters[`coaches/isCoach`]);

      const filteredCoaches = computed(() => {
        const coaches = store.getters[`coaches/coaches`];
        return coaches.filter((coach: { areas: Array<string> }) => {
          if (activeFilters.frontend && coach.areas.includes('frontend')) {
            return true;
          }
          if (activeFilters.backend && coach.areas.includes('backend')) {
            return true;
          }
          if (activeFilters.career && coach.areas.includes('career')) {
            return true;
          }
          return false;
        });
      });

      function setFilters(updatedFilters: any) {
        activeFilters.frontend = updatedFilters.frontend;
        activeFilters.backend = updatedFilters.backend;
        activeFilters.career = updatedFilters.career;
      }

      const hasCoaches = computed(() => !isLoading.value && store.getters[`coaches/coaches`]);

      onMounted(() => {
        loadCoaches(true);
      });

      async function loadCoaches(refresh = false): Promise<void> {
        isLoading.value = true;
        try {
          await store.dispatch(`coaches/${CoachesActionTypes.loadCoaches}`, {
            forceRefresh: refresh,
          });
        } catch (err) {
          error.value = err.message || 'Something went wrong';
        }
        isLoading.value = false;
      }

      function handleError() {
        error.value = null;
      }

      return {
        isLoading,
        error,
        activeFilters,
        isLoggedIn,
        isCoach,
        filteredCoaches,
        hasCoaches,
        setFilters,
        loadCoaches,
        handleError,
      };
    },
  });
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .controls {
    display: flex;
    justify-content: space-between;
  }
</style>
