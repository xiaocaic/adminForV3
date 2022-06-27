<template>
  <div>
    <el-card class="box-card">
      <el-input v-model="userInfo.name" placeholder=""></el-input>
      <div v-for="fit in fits" :key="fit" class="block">
        <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
        <p class="demonstration">{{ fit }}</p>
      </div>
    </el-card>
    <el-card class="box-card">
      <p>名字：{{ userInfo.name }}</p>
    </el-card>

    <el-card class="box-card">
      <div v-for="fit in fits" :key="fit" class="block">
        <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
        <p class="demonstration">{{ fit }}</p>
      </div>
    </el-card>
    <el-card class="box-card">
      <p>名字：{{ userInfo.name }}</p>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onActivated } from 'vue';
import { xPoet } from '@/api/home';
export default defineComponent({
  setup() {
    const state = reactive({
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      userInfo: {},
    });
    onActivated(() => {
      getData();
    });
    const getData = async () => {
      let res = await xPoet();
      console.log(res, 'res');
      if (res.status == 200) {
        state.userInfo = res.data;
      }
    };

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss">
.block {
  float: left;
  margin: 20px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
