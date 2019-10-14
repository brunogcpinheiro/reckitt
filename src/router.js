import Vue from "vue";
import Router from "vue-router";
import * as firebase from "firebase/app";
import "firebase/auth";

import Login from "@/components/Login";
import Signup from "@/components/Signup.vue";

import Initial from "@/views/Initial.vue";
import Store from "@/views/Store.vue";

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
    },
    {
      path: "/initial",
      name: "initial",
      component: Initial,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/store",
      name: "store",
      component: Store,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
