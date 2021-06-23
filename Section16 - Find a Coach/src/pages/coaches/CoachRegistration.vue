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

  import CoachForm from '../../components/coaches/CoachForm.vue';
  import { CoachesActionTypes } from '@/store/modules/coaches/action-types';

  export default defineComponent({
    name: 'CoachRegistration',
    components: {
      CoachForm,
    },
    setup() {
      const store = useStore();
      const router = useRouter();

      function saveData(data: any): void {
        store.dispatch(`coaches/${CoachesActionTypes.registerCoach}`, data);
        router.replace('/coaches');
      }

      return { saveData };
    },
  });
</script>

<style></style>
