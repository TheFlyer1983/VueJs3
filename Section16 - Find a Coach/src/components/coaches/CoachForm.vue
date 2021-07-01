<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: v$.firstName.$invalid && isFormSubmitted }">
      <label for="firstname">First Name</label>
      <input type="text" id="firstname" v-model.trim="fields.firstName" />
      <p v-if="v$.firstName.$invalid && isFormSubmitted">First Name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: v$.lastName.$invalid && isFormSubmitted }">
      <label for="lastname">Last Name</label>
      <input type="text" id="lastname" v-model.trim="fields.lastName" />
      <p v-if="v$.lastName.$invalid && isFormSubmitted">Last Name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: v$.description.$invalid && isFormSubmitted}">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="fields.description"></textarea>
      <p v-if="v$.description.$invalid && isFormSubmitted">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: v$.rate.$invalid && isFormSubmitted}">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="fields.rate" />
      <p v-if="v$.rate.$invalid && isFormSubmitted">Rate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: v$.areas.$invalid && isFormSubmitted }">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="fields.areas" />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="fields.areas" />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="fields.areas" />
        <label for="carrer">Career Advisory</label>
      </div>
      <p v-if="v$.areas.$invalid && isFormSubmitted">At least one expertise must be selected.</p>
    </div>
    <p v-if="v$.$invalid && isFormSubmitted">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import useVuelidate from '@vuelidate/core';
  import { required, minLength, minValue } from '@vuelidate/validators';

  export default defineComponent({
    name: 'CoachForm',
    emits: ['save-data'],
    setup(_props, context) {
      const fields = reactive({
        firstName: '',
        lastName: '',
        description: '',
        rate: 0,
        areas: [],
      });

      const isFormSubmitted = ref(false)

      const rules = {
        firstName: { required },
        lastName: { required },
        description: { required },
        rate: { required, minValue: minValue(1) },
        areas: { required, minLength: minLength(1) },
      };

      const v$ = useVuelidate(rules, fields);

      function submitForm() {
        isFormSubmitted.value = true;
        if (v$.value.$invalid) {
          return;
        }
        const formData = {
          first: fields.firstName,
          last: fields.lastName,
          desc: fields.description,
          rate: fields.rate,
          areas: fields.areas,
        };
        context.emit('save-data', formData);
      }

      return {
        fields,
        submitForm,
        isFormSubmitted,
        v$,
      };
    },
  });
</script>

<style scoped>
  .form-control {
    margin: 0.5rem 0;
  }
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }
  input[type='checkbox'] + label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
  }
  input,
  textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
  }
  input:focus,
  textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
  }
  input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
  }
  input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
  }
  h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
  }
  .invalid label {
    color: red;
  }
  .invalid input,
  .invalid textarea {
    border: 1px solid red;
  }
</style>
