<template>
  <div class="hj-user-rights-management-wrapper">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  name: "UserRightsManagement",
  data() {
    return {
      name: "UserRightsManagement",
      isRouterAlive: true
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(val);
        console.log("改变了路由");
        // this.reload();
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  mounted() {
    //console.log("改变了路由");
  }
};
</script>

<style    lang="scss" >
@import "./index.less";
</style>