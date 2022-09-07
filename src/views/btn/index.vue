<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
  <el-row class="mb-4">
    <!-- <draggable v-model="myArray" item-key="id">
      <template #item="{element}">
        <div>{{element.name}}</div>
      </template>
    </draggable> -->
  </el-row>
</template>

<script lang="ts" setup>
import _ from 'lodash';
import draggable from 'vuedraggable'
import { onMounted, onActivated,reactive } from 'vue';
// let myArray = reactive([1,2,3,4])
onMounted(() => {});
const de = _.uniq([1, 2, 2, 3]);
onActivated(() => {});
</script>
