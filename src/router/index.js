import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import test from "../views/test.vue";
import contactUs from "../views/contactUs.vue";
import Profile from "../views/Profile.vue";
import className from "../views/classeName.vue";
import register from "../views/auth/register.vue";
import resetPassword from "../views/auth/resetPassword.vue";
import NotFound from "../components/404.vue";
import forgetPassword from "../views/auth/forgetPassword.vue";
import login from "../views/auth/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter:(to,from,next) =>{
      var Role = JSON.parse(sessionStorage.getItem("userAuth"));
      if(!Role){
        return next({
          name: "login"
        })
      }
      next()
    }
  },
  {
    path: "/contactUs",
    name: "contactUs",
    component: contactUs,
    beforeEnter:(to,from,next) =>{
      var Role = JSON.parse(sessionStorage.getItem("userAuth"));
      if(!Role){
        return next({
          name: "login"
        })
      }
      next()
    }
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
    beforeEnter:(to,from,next) =>{
      var Role = JSON.parse(sessionStorage.getItem("userAuth"));
      if(!Role){
        return next({
          name: "login"
        })
      }else{
        console.log(Role)
      }
      next()
    }
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/test",
    name: "test",
    component: test,
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: resetPassword,
  },
 
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    component: forgetPassword,
  },

  {
    path: "/className",
    name: "className",
    component: className,
    beforeEnter:(to,from,next) =>{
      var Role = JSON.parse(sessionStorage.getItem("userAuth"));
      if(!Role){
        return next({
          name: "login"
        })
      }else if(Role.Role === "user"){
        return next({
          name: "Home"
        })
      }
      next()
    }
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/about",
    name: "About",
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
      beforeEnter:(to,from,next) =>{
        var Role = JSON.parse(sessionStorage.getItem("userAuth"));
        if(!Role){
          return next({
            name: "login"
          })
        }
        next()
      }
  },
   {
    path: "/:catchAll",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
