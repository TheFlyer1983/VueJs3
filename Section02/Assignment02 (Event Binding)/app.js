const app = Vue.createApp({
  data() {
    return {
      outputOne: '',
      outputTwo: '',
    };
  },
  methods: {
    showAlert() {
      alert('You clicked the button! This is an alert.');
    },
    showOutputOne(event) {
      this.outputOne = event.target.value;
    },
    pressEnter(event) {
      this.outputTwo = event.target.value;
    }
  }
});

app.mount('#assignment');