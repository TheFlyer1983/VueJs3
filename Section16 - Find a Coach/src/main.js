import { createApp, defineAsyncComponent } from 'vue';

import App from './App.vue';
import router from './router.js';
import store from './store';

import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseBadge from './components/UI/BaseBadge.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';
// import BaseDialog from './components/UI/BaseDialog.vue';

const BaseDialog = defineAsyncComponent(() => import('./components/UI/BaseDialog.vue'));

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
