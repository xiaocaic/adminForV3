<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" :default-active="defaultActive" text-color="#fff" @open="handleOpen" @close="handleClose">
    <el-sub-menu v-for="(item, index) of menuList" :index="item.path" :key="index">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-for="(child, Lindex) of item.children" :key="Lindex">
        <!-- 二级 -->
        <el-menu-item v-if="!!!child.children" :index="child.path" @click="go(child)"
          ><el-icon><component :is="child.meta.icon"></component></el-icon>{{ child.meta.title }}</el-menu-item
        >
        <!-- 三级 -->
        <el-sub-menu v-else :index="child.path">
          <template #title
            ><el-icon><component :is="child.meta.icon"></component></el-icon>{{ child.meta.title }}</template
          >
          <el-menu-item v-for="(childItem, childIndex) of child.children" :key="childIndex" :index="childItem.path" @click="go(childItem)"
            ><el-icon><component :is="childItem.meta.icon"></component></el-icon>{{ childItem.meta.title }}</el-menu-item
          >
        </el-sub-menu>
      </template>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
  setup(props, ctx) {
    let router = useRouter();
    const store = useStore();
    let defaultActive = ref('/home');
    let menuList = reactive([]);
    store.dispatch('getrouterList');
    menuList = store.state.navList;

    let routerPath = computed(() => {
      return router.currentRoute.value.path;
    });
    watch(
      () => router.currentRoute.value.path,
      (newValue, oldValue) => {
        defaultActive.value = newValue;
      },
      { immediate: true }
    );

    const isCollapse = ref(false);
    const handleOpen = (key: Number, keyPath: String) => {
      console.log(key, keyPath, 'opne');
    };
    const handleClose = (key: Number, keyPath: String) => {
      console.log(key, keyPath);
    };
    const go = (routerItem) => {
      store.dispatch('getRouterInfo', routerItem);
      ctx.emit('menvRouterName', routerItem);
      router.push({
        path: routerItem.path,
      });
    };
    return {
      defaultActive,
      go,
      isCollapse,
      menuList,
      routerPath,
      handleOpen,
      handleClose,
    };
  },
});
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  height: 91vh;
  min-height: 400px;
}
.el-menu-vertical-demo .el-sub-menu .el-menu-item {
  min-width: 180px;
}
</style>
