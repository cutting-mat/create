<template>
  <div class="flex-col">
    <!-- 头部 -->
    <BaseHeader />
    <dashboard v-if="$route.path == '/'" class="flex-1" />
    <router-view v-else class="flex-1" />
  </div>
</template>

<script>
export default {
  components: {
    dashboard: () => import("../components/TheDashboard.vue"),
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
@import url(../assets/style.css);

</style>
