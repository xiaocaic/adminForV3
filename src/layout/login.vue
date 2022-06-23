<template>
  <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="账号" prop="account">
      <el-input v-model="ruleForm.account" placeholder="请输入账号" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input placeholder="请输入密码" type="passWord" v-model="ruleForm.pass"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const validatePass = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('请输入账号'));
  }
};
const checkpass = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'));
  }
};

const ruleForm = reactive({
  account: '',
  pass: '',
});
const rules = reactive({
  account: [{ validator: validatePass, trigger: 'blur' }],
  pass: [{ validator: checkpass, trigger: 'blur' }],
});
const formName = ref(null);
const router = useRouter();
const submitForm = (formName) => {
  formName.validate();
  if (ruleForm.account && ruleForm.pass) {
    localStorage.setItem('pass', ruleForm.pass);
    router.push('/');
  }
};
const resetForm = () => {
  formName.resetFields();
};
</script>
<style lang="scss">
.demo-ruleForm {
  width: 30%;
  margin: 10% auto;
}
</style>
