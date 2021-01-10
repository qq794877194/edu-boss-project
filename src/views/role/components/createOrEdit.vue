<template>
    <el-form :model="form" :rules="rules" ref="form" style="padding: 0 20px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item class="tc">
        <el-button type="primary" @click="onSubmit" class="mr15">提交</el-button>
        <el-button @click="dialogClose">取消</el-button>
      </el-form-item>
    </el-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { createOrUpdateRole, getRoleById } from '@/api/role';

export default Vue.extend({
  name: 'createOrEdit',
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      },
      rules: {
        name: { required: true, message: '请输入角色名称', trigger: 'blur' },
        code: { required: true, message: '请输入角色编码', trigger: 'blur' },
        description: { required: true, message: '请输入角色描述', trigger: 'blur' }
      }
    };
  },
  async created () {
    if (this.roleId) {
      const { data } = await getRoleById(this.roleId);
      this.form = data.data;
    }
  },
  methods: {
    dialogClose () {
      this.$emit('dialogClose');
    },
    async onSubmit () {
      await (this.$refs.form as any).validate();
      const editText = this.roleId ? '编辑' : '添加';
      try {
        const { data } = await createOrUpdateRole(this.form);
        if (data.code === '000000') {
          this.$message.success(editText + '成功');
          this.$emit('editSuccess');
        } else {
          this.$message.error(editText + '失败');
        }
      } catch (e) {
        this.$message.error(editText + '失败');
      }
    }
  }
});
</script>

<style scoped>

</style>
