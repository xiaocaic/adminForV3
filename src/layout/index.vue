<template>
  <Header />
  <div class="menu">
    <Menu @menvRouterName="menvRouterName" />
  </div>
  <navMenu :menuItem="data.routerItem" @menvRouterName="menvRouterName" />
  <div class="routerView">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import Menu from './menu.vue';
import Header from './header.vue';
import navMenu from './navMenu.vue';
import { defineProps, reactive } from 'vue';
let props = defineProps();
let data = reactive({
  routerItem: {},
});
const menvRouterName = (routerItem) => {
  data.routerItem = routerItem;
};
</script>

<style>
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.menu {
  width: 12vw;
  float: left;
  overflow: hidden;
}
.routerView {
  height: 85vh;
  overflow: hidden;
  overflow-y: scroll;
  padding: 1vw;
  box-sizing: border-box;
}
</style>
