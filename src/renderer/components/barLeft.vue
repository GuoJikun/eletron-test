<template>
  <div class="BarLeft">
    <div class="userIcon">
      <img src="../assets/avatar.jpg" alt="" />
    </div>
    <div class="menu">
      <router-link
        v-for="item in mainWindowRoutes"
        :to="item.path"
        :class="[`menuItem`, { selected: item.isSelected }]"
      >
        <i
          :class="[`icon`, item.isSelected ? item.iconSelected : item.icon]"
        ></i>
      </router-link>
    </div>
    <div class="setting">
      <div class="menuItem">
        <i class="icon icon-setting"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//src\renderer\Component\BarLeft.vue
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
//菜单列表数组
let mainWindowRoutes = ref([
  {
    path: `/WindowMain/Chat`,
    isSelected: true,
    icon: `icon-chat`,
    iconSelected: `icon-chat`,
  },
  {
    path: `/WindowMain/Contact`,
    isSelected: false,
    icon: `icon-tongxunlu`,
    iconSelected: `icon-tongxunlu`,
  },
  {
    path: `/WindowMain/Collection`,
    isSelected: false,
    icon: `icon-shoucang`,
    iconSelected: `icon-shoucang`,
  },
]);

let openSettingWindow = () => {
  let config = {
    modal: true,
    width: 2002,
    webPreferences: { webviewTag: false },
  };
  window.open(
    `/WindowSetting/AccountSetting`,
    "_blank",
    JSON.stringify(config)
  );
};

let route = useRoute();
//注册路由变化监听器
watch(
  () => route,
  () =>
    mainWindowRoutes.value.forEach(
      (v) => (v.isSelected = v.path === route.fullPath)
    ),
  {
    immediate: true,
    deep: true,
  }
);
</script>
