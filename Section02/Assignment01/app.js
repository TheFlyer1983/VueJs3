const app = Vue.createApp({
  data() {
    return {
      name: 'Paul',
      age: 37,
      favouriteNumber: Math.random(),
      imageURL: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
    };
  },
  methods: {
    randomNumber() {
      return Math.random();
    }
  }
});

app.mount('#assignment');