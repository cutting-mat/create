<template>
  <router-view id="app" />
</template>

<script>
import * as util from "@/main/assets/util.js";
import { store } from "@/store";
import { instance } from "@/api";

export default {
  methods: {
    signin: function (callback) {

      let localUser = util.storage("auth") || {};
     
      instance.defaults.headers.common["Authorization"] =
        localUser.accessToken || "";
      // Update token info
      store.set("accessToken", localUser.accessToken || "");

      typeof callback === "function" && callback();
    },
    loginDirect: function (res) {
      /*
       * Monitor login events
       * Will trigger the events in views/login.vue
       */
      util.storage("auth", res.data);

      this.signin(() => {
        // 登录成功（silent来自token续签）
        if (!res.silent) {
          this.initUser(res);
        }
      });
    },
    logoutDirect: function () {
      /*
       * Monitor logout events
       * Will trigger the events in views/index.vue
       */

      util.storage("auth", "");

      window.location.href = process.env.BASE_URL || "/";
    },
    initUser: function (loginRes) {
      store.action("user").then(() => {
        // 如果当前是登录页，跳回首页
        if (loginRes && loginRes.from) {
          this.$router.replace({ path: loginRes.from });
        } else if (this.$router.currentRoute.path == "/login") {
          this.$router.replace({ path: "/" });
        }
      });
    },
  },
  created: function () {
    /*
     * Start from here!
     */
    this.signin(this.initUser);

    // global event
    util.on("login", this.loginDirect);
    util.on("logout", this.logoutDirect);
  },
};
</script>

<style>
@import url(main/assets/global.css);
</style>
