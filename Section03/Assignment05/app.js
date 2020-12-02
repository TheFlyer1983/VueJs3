const app = Vue.createApp({
  data() {
    return {
      tasks: [],
      taskInput: '',
      hidden: false,
    };
  },
  methods: {
    addTask() {
      this.tasks.push(this.taskInput)
    },
    toggleList(){
      this.hidden = !this.hidden;
    }
  },
  computed: {
    updateLabel() {
      return this.hidden ? 'Show' : 'Hide';
    }
  }
});

app.mount('#assignment');
