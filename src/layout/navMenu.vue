<template>
  <div class="navMenuDiv">
    <p v-for="(item, index) of data.routerInfo" :class="{ activeBg: data.routerName == item.name }" :key="index" @click="go(item)" @contextmenu.prevent="openMenu(item, $event)">
      {{ item.meta.title }}
      <span @click.stop="delet(item)">x</span>
    </p>
    <ul v-show="data.visible" :style="{ left: data.left + 'px', top: data.top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag()">刷新</li>
      <li v-if="data.routerName == data.tag.name" @click="delet(data.tag)">关闭当前</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags()">关闭所有</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch, unref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter();
const store = useStore();
const props = defineProps({ menuItem: Object });
const emit = defineEmits(['menvRouterName']);
let { menuItem } = toRefs(props);
let data = reactive({
  routerInfo: [],
  newStoreList: [],
  isTrue: false,
  routerName: '',
  visible: false,
  left: 0,
  top: 0,
  tag: {
    name: String,
  },
});

watch(
  [() => store.state.routerInfo, menuItem],
  (newVal) => {
    data.isTrue = newVal[0].length == 1;
    data.routerInfo = newVal[0];
    data.routerName = !!newVal[1].name ? newVal[1].name : router.currentRoute.value.name;
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  let list = reactive({
    navList: JSON.parse(localStorage.getItem('navList')),
  });
  !!list.navList && store.dispatch('increment', list.navList);
});
const go = (routerItem) => {
  data.routerName = routerItem.name;
  router.push({
    path: routerItem.path,
  });
};

const openMenu = (tag, e) => {
  data.visible = true;
  data.left = e.pageX + 10;
  data.top = e.pageY + 10;
  data.tag = tag;
};
const closeAllTags = () => {
  store.dispatch('increment', [
    {
      meta: { title: '首页', icon: 'document' },
      name: 'Home',
      path: '/home',
    },
  ]);
  emit('menvRouterName', { name: 'Home' });
  router.push({
    path: '/home',
  });
};
const refreshSelectedTag = () => {
  router.go(0);
};
const closeOthersTags = () => {
  data.newStoreList = [];
  store.state.routerInfo.forEach((x) => {
    if (x.name == data.tag.name) {
      data.newStoreList.push(x);
    }
  });
  store.dispatch('increment', data.newStoreList);
  emit('menvRouterName', { name: data.newStoreList[0].name });
  router.push({
    path: data.newStoreList[0].path,
  });
};
const closeMenu = () => {
  data.visible = false;
};
watch(
  () => data.visible,
  (newVal) => {
    if (newVal) {
      document.body.addEventListener('click', closeMenu);
    } else {
      document.body.removeEventListener('click', closeMenu);
    }
  },
  { immediate: true, deep: true }
);
const delet = (routerItem) => {
  data.newStoreList = [];
  if (!data.isTrue) {
    store.state.routerInfo.forEach((x) => {
      if (x.name != routerItem.name) {
        data.newStoreList.push(x);
      }
    });
    store.dispatch('increment', data.newStoreList);
    if (data.routerName == routerItem.name) {
      emit('menvRouterName', data.newStoreList[data.newStoreList.length - 1]);
    } else {
      emit('menvRouterName', { name: data.routerName });
    }
    router.push({
      path: data.newStoreList[data.newStoreList.length - 1].path,
    });
  }
};
</script>
<style scoped lang="scss">
.navMenuDiv {
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  font-size: 16px;
  background: aliceblue;
  .activeBg {
    background-color: #42b983;
  }
  p {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
    height: 26px;
    line-height: 20px;
    background-color: #409eff;
    color: #fff;
    text-align: center;
    box-sizing: border-box;
    padding: 0.2vw 0.5vw 0.2vw 1vw;
    border-radius: 0.5vw;
    margin-left: 0.5vw;
    span {
      width: 15px;
      height: 15px;
      line-height: 13px;
      box-sizing: border-box;
      border-radius: 50% 50%;
      display: inline-block;
      &:hover {
        background: gray;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      height: 30px;
      line-height: 30px;
      padding: 0px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
