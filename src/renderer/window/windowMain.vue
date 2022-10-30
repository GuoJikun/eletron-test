<template>
  <BarLeft />
  <div class="pageBox">
    <router-view />
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from "electron";
import { onMounted } from "vue";
onMounted(() => {
  ipcRenderer.invoke("showWindow");
});
</script>
