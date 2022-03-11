<template>
<el-card class="box-card">
  <div v-for="fit in fits" :key="fit" class="block">
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :fit="fit"
    ></el-image>
    <p class="demonstration">{{ fit }}</p>
  </div>
</el-card>
<el-card class="box-card">
  <p>名字：{{userInfo.name}}</p>
</el-card>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs ,onMounted} from 'vue'
  import axios from '../../utils/axios'
  export default defineComponent({
    setup() {
      const state = reactive({
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        userInfo:{},
      })
      onMounted(() => {
        getData()
      })
      const getData = ()=>{
        axios.get('/users/XPoet').then((res) => {
          if(res.status == 200){
            return state.userInfo = res.data
          }
        }).catch((err) => {
          console.log('err: ', err)
        })
      } 

    return {
      ...toRefs(state),
    }
      
    }
  })
</script>
<style lang="scss">
  .block{
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