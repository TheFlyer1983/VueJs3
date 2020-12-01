const app = Vue.createApp({
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    addNumber(num) {
      this.counter += num;
    },
  },
  computed: {
    result() {
      if (this.counter <= 37) {
        return 'Not there yet';
      } else {
        return 'Too much!';
      }
    },
  },
  watch: {
    result() {
      setTimeout(() => {
        this.counter = 0;
      }, 5000);
    },
  },
});

app.mount('#assignment');
