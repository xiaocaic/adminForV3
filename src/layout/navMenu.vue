<template>
  <div class="navMenuDiv">
    <p v-for="(item, index) of data.routerInfo" :class="{ activeBg: data.routerName == item.name }" :key="index" @click="go(item)">
      {{ item.meta.title }}
      <span @click.stop="delet(item)">x</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch } from 'vue';
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
  store.dispatch('increment', JSON.parse(localStorage.getItem('navList')));
});
const go = (routerItem) => {
  data.routerName = routerItem.name;
  router.push({
    path: routerItem.path,
  });
};

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
}
</style>
