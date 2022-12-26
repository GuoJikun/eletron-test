import * as VueRouter from "vue-router";
//路由规则描述数组
const routes = [
  { path: "/", redirect: "/WindowMain/Chat" },
  {
    path: "/WindowMain",
    component: () => import("../window/windowMain.vue"),
    children: [
      {
        path: "Chat",
        component: () => import("../window/windowMain/chat.vue"),
      },
      {
        path: "Contact",
        component: () => import("../window/windowMain/contact.vue"),
      },
      {
        path: "Collection",
        component: () => import("../window/windowMain/collection.vue"),
      },
    ],
  },
  {
    path: "/WindowSetting",
    component: () => import("../window/windowSetting.vue"),
    children: [
      {
        path: "AccountSetting",
        component: () => import("../window/windowSetting/accountSetting.vue"),
      },
      {
        path: "login",
        component: () => import("../window/windowSetting/login.vue"),
      },
    ],
  },
  {
    path: "/WindowUserInfo",
    component: () => import("../window/windowUserInfo.vue"),
  },
];
//导出路由对象
export let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});
