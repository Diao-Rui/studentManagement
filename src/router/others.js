import Layout from "../views/layout/LayoutView.vue";
const otherRouters = [
  {
    path: "/order",
    name: "order",
    redirect: "order/orderInfo",
    component: Layout,
    children: [
      {
        path: "orderInfo",
        name: "orderInfo",
        component: () => import("../views/order/orderView.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    redirect: "user/userInfo",
    component: Layout,
    children: [
      {
        path: "userInfo",
        name: "userInfo",
        component: () => import("../views/user/userInfoView.vue"),
      },
      {
        path: "userAdd",
        name: "userAdd",
        component: () => import("../views/user/userAddView.vue"),
      },
    ],
  },
];
// 建议使用默认导出，而不是直接导出
export default otherRouters;
