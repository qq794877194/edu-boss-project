<template>
  <el-card class="menu-create">
    <div slot="header">
      <span class="mr15">{{isEdit ? '编辑' : '添加'}}菜单</span>
      <el-link type="primary" @click="$router.back()">
        <i class="el-icon-back"></i>
        返回
      </el-link>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <el-select v-model="ruleForm.parentId" placeholder="请选择上级菜单">
          <el-option label="无上级菜单" :value="-1"></el-option>
          <el-option v-for="menu in parentMenuList" :label="menu.name" :value="menu.id" :key="menu.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单路径" prop="href">
        <el-input v-model="ruleForm.href"></el-input>
      </el-form-item>
      <el-form-item label="前端图标" prop="icon">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="shown">
        <el-switch v-model="ruleForm.shown"></el-switch>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-inputNumber type="number" v-model="ruleForm.orderNum"></el-inputNumber>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')" v-if="!isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { createOrUpdateMenu, getEditMenuInfo } from '@/api/menu';

export default Vue.extend({
  name: 'createOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      parentMenuList: [],
      ruleForm: {
        name: '测试菜单',
        parentId: -1,
        href: 'fsf',
        icon: '412f',
        orderNum: 1,
        description: '123',
        shown: true
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        parentId: { required: true, message: '请选择上级菜单', trigger: 'change' },
        href: { required: true, message: '请输入菜单路径', trigger: 'blur' },
        icon: { required: true, message: '请输入菜单图标', trigger: 'blur' },
        description: { required: true, message: '请输入菜单描述', trigger: 'change' },
        orderNum: { required: true, message: '请输入排序', trigger: 'change' }
      }
    };
  },
  created () {
    this.loadMenuInfo();
  },
  methods: {
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1);
      if (data.data.menuInfo) {
        this.ruleForm = data.data.menuInfo;
      }
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList.filter((menu: any) => !menu.subMenuList);
      }
    },
    async submitForm () {
      const { data } = await createOrUpdateMenu(this.ruleForm);
      if (data.data) {
        this.$message.success('添加成功');
        this.$router.back();
      }
      // (this.$refs.ruleForm as any).validate();
    },
    resetForm () {
      (this.$refs.ruleForm as any).resetFields();
    }
  }
});
</script>

<style scoped>

</style>
