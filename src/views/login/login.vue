<template>
  <div class="login m-list list-center">
    <el-form label-position="top" ref="form" :model="form" :rules="rules">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Form } from 'element-ui';
import { login } from '@/api/login';

export default Vue.extend({
  name: 'login',
  data () {
    return {
      loading: false,
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    };
  },
  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate();
      } catch (e) {
        return;
      }

      this.loading = true;
      const { data } = await login(this.form);
      if (data.state !== 1) {
        this.$message.error(data.message);
      } else {
        this.$store.commit('setUser', data.content);
        const url = this.$route.query.redirect as string || '/';
        this.$router.push(url);
        this.$message.success('登录成功');
      }

      this.loading = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.login{
  height: 100vh;
  .el-form{
    width: 300px;
    background: white;
    padding: 20px;
    border-radius: 5px;
    .el-button{
      width: 100%;
    }
  }
}
</style>
