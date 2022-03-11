<template>
<div class="demo-image">
    <div v-for="fit in fits" :key="fit" class="block">
      <el-image
        style="width: 100px; height: 100px"
        :src="url"
        :fit="fit"
      ></el-image>
      <p class="demonstration">{{ fit }}</p>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import axios from '../../utils/axios'

  export default defineComponent({
    
    setup() {
      axios
        .get('/users/XPoet')
        .then((res) => {
          console.log('res: ', res)
        })
        .catch((err) => {
          console.log('err: ', err)
        })

      const state = reactive({
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    })

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
</style>