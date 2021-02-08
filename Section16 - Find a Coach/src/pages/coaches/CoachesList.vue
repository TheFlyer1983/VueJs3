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
  import { defineComponent } from 'vue';

  import CoachItem from '../../components/coaches/CoachItem.vue';
  import CoachFilter from '../../components/coaches/CoachFilter.vue';
  import { Coaches } from '@/types/interfaces';

  export default defineComponent({
    name: 'CoachesList',
    components: {
      CoachItem,
      CoachFilter,
    },
    data() {
      return {
        isLoading: false,
        error: null,
        activeFilters: {
          frontend: true,
          backend: true,
          career: true,
        },
      };
    },
    computed: {
      isLoggedIn(): boolean {
        return this.$store.getters.isAuthenticated;
      },
      isCoach(): boolean {
        return this.$store.getters['coaches/isCoach'];
      },
      filteredCoaches(): Coaches {
        const coaches = this.$store.getters['coaches/coaches'];
        return coaches.filter((coach: { areas: Array<string> }) => {
          if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
            return true;
          }
          if (this.activeFilters.backend && coach.areas.includes('backend')) {
            return true;
          }
          if (this.activeFilters.career && coach.areas.includes('career')) {
            return true;
          }
          return false;
        });
      },
      hasCoaches(): boolean {
        return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
      },
    },
    created(): void {
      this.loadCoaches();
    },
    methods: {
      setFilters(updatedFilters: any) {
        this.activeFilters = updatedFilters;
      },
      async loadCoaches(refresh = false): Promise<void> {
        this.isLoading = true;
        try {
          await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh });
        } catch (error) {
          this.error = error.message || 'Something went wrong!';
        }
        this.isLoading = false;
      },
      handleError() {
        this.error = null;
      },
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
