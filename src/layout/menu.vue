<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu v-for="item,index of menuList" :index="item.name" :key="index">
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{item.meta.title}}</span>
      </template>
      <el-menu-item-group v-for="Litem,Lindex of item.children" :key="Lindex" >
        <el-menu-item :index="index+'-'+Lindex" @click="go(Litem.path)">{{Litem.meta.title}}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons'
import {useRouter} from 'vue-router'
export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
  setup() {
    let router = useRouter();
    const menuList = reactive([])
    router.options.routes.map(x=>{
      if(x.meta){
        menuList.push(x)
      }
    })
    const isCollapse = ref(false)
    const handleOpen = (key:Number, keyPath:String) => {
      console.log(key, keyPath)
    }
    const handleClose = (key:Number, keyPath:String) => {
      console.log(key, keyPath)
    }
    const go =(path)=>{
       router.push({
        path:path,
       });
    }
    return {
      go,
      isCollapse,
      menuList,
      handleOpen,
      handleClose,
    }
  },
})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
}
</style>
