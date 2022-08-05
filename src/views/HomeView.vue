<template>
  <map-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MapView from "@/components/core/MapView.vue";
export default defineComponent({
  name: "HomeView",
  components: {
    MapView,
  },
});
</script>
