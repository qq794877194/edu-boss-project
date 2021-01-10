<template>
  <div class="course">
    <el-card>
      <div slot="header" class="m-list list-justify">
        <el-form label-width="70px" :model="form" ref="form" :inline="true">
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="form.courseName" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select placeholder="请选择" v-model="form.status">
              <el-option label="全部" value=""></el-option>
              <el-option label="已上架" value="1"></el-option>
              <el-option label="已下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch" :loading="loading">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="$router.push({name: 'course-new'})">新建课程</el-button>
      </div>
      <el-table :data="courses" class="mb30"  v-loading="loading">
        <el-table-column v-for="item in column" :label="item.label" :prop="item.prop" :key="item.prop" />
        <el-table-column label="上架状态" align="center">
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.stateLoading"
              @change="toggleCourse(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-link type="primary" class="mr15" @click="$router.push({name: 'course-edit', params: {courseId: scope.row.id}})">编辑</el-link>
            <el-link type="primary" @click="$router.push({name: 'course-section', params: {courseId: scope.row.id}})">内容管理</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :disabled="loading"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getQueryCourses, changeCourseState } from '@/api/course';

const column = [
  { label: 'ID', prop: 'id' },
  { label: '课程名称', prop: 'courseName' },
  { label: '价格', prop: 'priceText' },
  { label: '排序', prop: 'sortNum' }
];
export default Vue.extend({
  name: 'course',
  data () {
    return {
      column,
      form: {
        courseName: '',
        status: '',
        currentPage: 1,
        pageSize: 10
      },
      loading: false,
      userId: null,
      courses: [],
      total: 0,
      roleSwitch: false,
      roleIdList: [],
      roles: []
    };
  },
  created () {
    this.loadCourses();
  },
  methods: {
    async loadCourses () {
      const { data } = await getQueryCourses(this.form);
      this.courses = data.data.records.map((item: any) => {
        item.createTime = this.$formatDate(item.createTime);
        item.priceText = '￥' + item.price;
        item.stateLoading = false;
        return item;
      });
      this.total = data.data.total;
    },
    handleSearch () {
      this.form.currentPage = 1;
      this.loadCourses();
    },
    handleSizeChange (size: number) {
      this.form.pageSize = size;
      this.form.currentPage = 1;
      this.loadCourses();
    },
    handleCurrentChange (page: number) {
      this.form.currentPage = page;
      this.loadCourses();
    },
    async toggleCourse (course: any) {
      const text = course.status ? '上架' : '下架';
      course.stateLoading = true;
      try {
        await changeCourseState({
          courseId: course.id,
          status: course.status
        });
        this.$message.success(text + '成功');
      } catch (e) {
        this.$message.error(text + '失败');
      }
      course.stateLoading = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.course{
  .el-form-item{
    margin-bottom: 0;
  }
}
</style>
