import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout/LayoutView.vue";
import otherRouters from "./others";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/food",
    component: Layout,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/loginView.vue"),
  },
  {
    path: "/food",
    name: "food",
    redirect: "food/Info",
    component: Layout,
    children: [
      {
        path: "Info",
        name: "info",
        component: () =>
          import(/* webpackChunkName: "sx" */ "../views/food/foodInfoView.vue"),
      },
      {
        path: "add",
        name: "add",
        component: () =>
          import(/* webpackChunkName: "bh" */ "../views/food/addFoodView.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    redirect: "admin/adminInfo",
    component: Layout,
    children: [
      {
        path: "adminInfo",
        name: "adminInfo",
        component: () => import("../views/admin/adminInfoView.vue"),
      },
    ],
  },
  // 解析其他文件的routers
  ...otherRouters,
];

const router = new VueRouter({
  routes,
});
// 挂载路由导航守卫
// to 将要访问的路径
// from 代表从哪个路径跳转而来
// next 是个函数，表示放行 next() 放行  next('/login') 强制跳转
// router.beforeEach((to, from, next) => {
//     if (to.path.startsWith('/Login/Login')) {
//         window.sessionStorage.removeItem('Token')
//         next()
//     } else {
//         let user = window.sessionStorage.getItem('Token')
//         if (!user) {
//             next({
//                 path: '/Login/Login'
//             })
//         } else {
//             next()
//         }
//     }
// });

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
export default router;
