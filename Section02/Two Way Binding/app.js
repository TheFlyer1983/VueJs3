const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: '',
      lastName: '',
      //fullname: '',
    };
  },
  methods: {
    // outputFullName(){
    //   if (this.name !== ''){
    //     return this.name + ' ' + 'Livingstone';
    //   }
    // },
    // setName(event, lastName) {
    //   this.name = event.target.value;
    // },
    add(num) {
      this.counter = this.counter + num;
    },
    reduce(num) {
      this.counter = this.counter - num;
      // this.counter--;
    },
    resetInput() {
      this.name = '';
    },
  },
  computed: {
    fullname() {
      return this.name + ' ' + this.lastName;
    },
  },
  watch: {
    /* name(value) {
      this.fullname = value + ' ' + this.lastName;
    },
    lastName(value) {
      this.fullname = this.name + ' ' + value;
    } */
    counter(value) {
      if (value > 50) {
        setTimeout(() => {
          this.counter = 0;
        }, 2000);
      }
    },
  },
});

app.mount('#events');
