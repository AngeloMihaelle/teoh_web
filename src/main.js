import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import VueSmoothScroll from "vue3-smooth-scroll";

import Button from "./components/Button.vue";
import LinkButton from "./components/LinkButton.vue";
import router from './router';
import {createStore} from 'vuex';





const store = createStore({
    state: {
      user: null, // Por ejemplo, puedes almacenar el usuario en el state
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
    },
    actions: {
      // acciones si las necesitas
    },
  });

let app = createApp(App);

app.use(VueSmoothScroll);
app.use(router);
app.use(store);
app.component("Button", Button);
app.component("LinkButton", LinkButton);

app.mount("#app");
