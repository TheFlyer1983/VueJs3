<template>
  <div>
    <base-dialog v-if="inputIsInvalid" title="Invalid Input" @close="confirmError">
      <template #default>
        <p>Unfortunately, at least one input value is invalid.</p>
        <p>
          Please check all inputs and make sure you enter at least a few characters into each input
          field
        </p>
      </template>
      <template #actions>
        <base-button @click="confirmError">OK</base-button>
      </template>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitData">
        <div class="form-control">
          <label for="title">Title</label>
          <input type="text" id="title" name="title" ref="titleInput" />
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <textarea id="description" name="description" rows="3" ref="descInput"></textarea>
        </div>
        <div class="form-control">
          <label for="link">Link</label>
          <input type="url" id="link" name="link" ref="linkInput" />
        </div>
        <div>
          <base-button type="submit">Add Resource</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
  import BaseDialog from '../UI/BaseDialog.vue';
    export default {
    components: { BaseDialog },
      inject: ['addResource'],
      data() {
        return {
          inputIsInvalid: false,
        };
      },
      methods: {
        submitData() {
          if (this.$refs.titleInput.value.trim() === '' || this.$refs.descInput.value.trim() === '' || this.$refs.linkInput.value.trim() === '') {
            this.inputIsInvalid = true;
            return;
          }
          const resource = {
            id: new Date().toISOString(),
            title: this.$refs.titleInput.value,
            description: this.$refs.descInput.value,
            link: this.$refs.linkInput.value,
          };

          this.addResource(resource);
        },
        confirmError() {
          this.inputIsInvalid = false;
        },
      },
    };
</script>

<style scoped>
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    padding: 0.15rem;
    border: 1px solid #ccc;
  }
  input:focus,
  textarea:focus {
    outline: none;
    border-color: #3a0061;
    background-color: #f7ebff;
  }
  .form-control {
    margin: 1rem 0;
  }
</style>
