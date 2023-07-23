import { createRouter, createWebHistory } from "vue-router";
import Tables from "../views/Tables.vue";
import Portfolio from "../views/Portfolio.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Sending from "../views/Sending.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/portfolio",
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/send",
    name: "Send",
    component: Sending,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
