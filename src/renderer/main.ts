import { createApp } from "vue";
import { router } from "./router";
import "./style.css";
import App from "./App.vue";
import "./assets/icon/iconfont.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App).use(router).use(ElementPlus).mount("#app");
