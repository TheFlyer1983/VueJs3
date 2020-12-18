import { createStore } from 'vuex';

import productsModule from './modules/products.vuex.js';
import cartModule from './modules/cart.vuex.js';
import userModule from './modules/user.vuex.js';

const store = createStore({
  modules: {
    products: productsModule,
    cart: cartModule,
    user: userModule,
  },
});

export default store;
