<template>
  <div>
    <section>
      <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  import { routerPaths } from '@/router/router-paths';

  import CoachForm from '../../components/coaches/CoachForm.vue';
  import { CoachesActions } from '@/store/modules/coaches/types';

  export default defineComponent({
    name: 'CoachRegistration',
    components: {
      CoachForm,
    },
    setup() {
      const store = useStore();
      const router = useRouter();

      function saveData(data: any): void {
        store.dispatch(`coaches/${CoachesActions.registerCoach}`, data);
        router.replace(routerPaths.coaches.path);
      }

      return { saveData };
    },
  });
</script>

<style></style>
