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
</template>

<script lang="ts" setup>
import _ from 'lodash';
import { onMounted, onActivated } from 'vue';
onMounted(() => {});
const de = _.uniq([1, 2, 2, 3]);
onActivated(() => {});
</script>
