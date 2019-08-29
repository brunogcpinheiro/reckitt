import Vue from "vue";
import Router from "vue-router";

import Login from "./components/Login";
import Signup from "./components/Signup.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import("./components/Signup.vue")
    }
  ]
});

export default router;
