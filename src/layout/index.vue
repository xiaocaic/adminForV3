<template>
  <Header />
    <div class="menu">
      <Menu />
    </div>
    <div class="routerView">
      <router-view />
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import Menu from './menu.vue'
import Header from './header.vue'
export default defineComponent({
  components:{Menu,Header}
})
</script>

<style>
.menu{
  width: 12vw;
  float: left;
}
.routerView{
  float: left;
  width: 85vw;
  margin-left: 1vw;
}
</style>