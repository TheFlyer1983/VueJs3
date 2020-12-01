const app = Vue.createApp({
  data() {
    return {
      userClass: '',
      userStyle: '',
      hidden: false,
    };
  },
  computed: {
    paragraphOneStyling() {
      return this.userClass;
    },
    toggleParagraph() {
      return this.hidden ? 'hidden' : 'visible';
    },
    paragraphColor() {
      return {backgroundColor: this.userStyle};
    },
  },
  methods: {
    toggleStyling() {
      this.hidden = !this.hidden;
    },
  },
});

app.mount('#assignment');
