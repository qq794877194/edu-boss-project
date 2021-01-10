<template>
  <el-card class="allocation-menu">
    <div slot="header">
      <span class="mr15">分配资源</span>
      <el-link type="primary" @click="$router.back()">
        <i class="el-icon-back"></i>
        返回
      </el-link>
    </div>
    <el-tree
      :props="defaultProps"
      :data="resourceList"
      ref="resource-tree"
      node-key="id"
      show-checkbox
      :default-checked-keys="checkedKeys"
      :default-expand-all="true"
    >
    </el-tree>
    <div class="m-list list-center" style="margin-top: 30px">
      <el-button type="primary" class="mr15" @click="onSave">保存</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tree } from 'element-ui';
import { getRoleResources, allocateRoleResources } from '@/api/resource';
export default Vue.extend({
  name: 'allocation-source',
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      resourceList: [],
      checkedKeys: [],
      defaultProps: {
        children: 'resourceList',
        label: 'name'
      }
    };
  },
  created () {
    this.loadRoleResources();
  },
  methods: {
    async loadRoleResources () {
      const { data } = await getRoleResources(this.roleId);
      this.getCheckedKeys(data.data);
      this.resourceList = data.data;
    },
    getCheckedKeys (resources: any) {
      resources.forEach((resource: any) => {
        if (resource.resourceList) {
          resource.id = 't' + resource.id;
          this.getCheckedKeys(resource.resourceList);
        }
        if (resource.categoryId) {
          if (resource.selected) {
            this.checkedKeys = [...this.checkedKeys, resource.id as never];
          }
        }
      });
    },

    onSave () {
      let resourceIdList = (this.$refs['resource-tree'] as Tree).getCheckedKeys();
      if (!resourceIdList.length) {
        this.$message.warning('请选择要分配的资源');
        return;
      }
      resourceIdList = resourceIdList.filter((r: any) => !/^t/.test(r));
      allocateRoleResources({ roleId: this.roleId, resourceIdList })
        .then(res => {
          this.$message.success('资源分配成功');
          this.$router.back();
        }).catch(err => {
          this.$message.error('资源分配失败');
        });
    },
    resetChecked () {
      (this.$refs['resource-tree'] as Tree).setCheckedKeys([]);
    }
  }
});
</script>

<style scoped>

</style>
