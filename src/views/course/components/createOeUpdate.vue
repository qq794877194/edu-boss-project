<template>
  <el-card>
    <div slot="header">
      <el-steps :active="activeStep" simple>
        <el-step
          v-for="(item, index) in steps"
          :title="item.title"
          :icon="item.icon"
          class="cp"
          :key="index"
          @click.native="activeStep = index"
        />
      </el-steps>
    </div>
    <el-form label-width="90px" ref="form">
      <div v-show="activeStep === 0">
        <el-form-item label="课程名称">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input v-model="course.brief"></el-input>
        </el-form-item>
        <el-form-item label="课程概述">
          <el-input class="mb10" v-model="course.previewFirstField" type="textarea" placeholder="概述1"></el-input>
          <el-input v-model="course.previewSecondField" type="textarea" placeholder="概述2"></el-input>
        </el-form-item>
        <el-form-item label="讲师姓名">
          <el-input v-model="course.teacherDTO.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input v-model="course.teacherDTO.description"></el-input>
        </el-form-item>
        <el-form-item label="课程排序">
          <el-input-number v-model="course.sortNum" label="描述文字"></el-input-number>
        </el-form-item>
      </div>
      <div v-show="activeStep === 1">
        <el-form-item label="课程封面">
          <!--
            v-model的本质还是父子组件通信
            1. 它会给子组件传递一个名字叫value的数据
            2. 默认监听input事件， 修改绑定的数据(自定义事件)
          -->
          <img-upload v-model="course.courseListImg" />
        </el-form-item>
        <el-form-item label="介绍封面">
          <img-upload :limit="3" v-model="course.courseImgUrl" />
        </el-form-item>
      </div>
      <div v-show="activeStep === 2">
        <el-form-item label="售卖价格">
          <el-input v-model="course.discounts">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品原价">
          <el-input v-model="course.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="course.sales">
            <template slot="append">单</template>
          </el-input>
        </el-form-item>
        <el-form-item label="活动标签">
          <el-input v-model="course.discountsTag">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </div>
      <div v-show="activeStep === 3">
        <el-form-item label-width="120px" label="限时秒杀开关">
          <el-switch
            v-model="course.activityCourse"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <template v-if="course.activityCourse">
          <el-form-item label="开始时间">
            <el-date-picker type="datetime" v-model="course.activityCourseDTO.beginTime" placeholder="请选择开始时间" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker type="datetime" v-model="course.activityCourseDTO.endTime" placeholder="请选择结束时间" />
          </el-form-item>
          <el-form-item label="秒杀价">
            <el-input v-model="course.activityCourseDTO.amount">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="秒杀库存">
            <el-input-number v-model="course.activityCourseDTO.stock"></el-input-number>
          </el-form-item>
        </template>

      </div>
      <div v-show="activeStep === 4">
        <el-form-item label="是否发布">
          <el-switch
            v-model="course.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="课程详情">
          <textEditor v-model="course.courseDescriptionMarkDown" />
        </el-form-item>
      </div>
      <el-form-item align="center">
        <el-button v-if="activeStep > 0" class="mr15" @click="prevStep">上一步</el-button>
        <el-button type="primary" @click="nextStep" v-if="activeStep < 4">下一步</el-button>
        <el-button type="primary" @click="handleSave" v-if="activeStep === 4">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import imgUpload from '@/components/imgUpload/imgUpload.vue';
import { saveOrUpdateCourse, uploadCourseImage, getCourseById } from '@/api/course';
import textEditor from '@/components/textEditor/textEditor.vue';

const steps = [
  { title: '基本信息', icon: 'el-icon-edit' },
  { title: '课程封面', icon: 'el-icon-edit' },
  { title: '销售信息', icon: 'el-icon-edit' },
  { title: '秒杀活动', icon: 'el-icon-edit' },
  { title: '课程详情', icon: 'el-icon-edit' }
];
export default Vue.extend({
  name: 'course-createOrUpdate',
  props: {
    courseId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      activeStep: 0,
      steps,
      imageUrl: '', // 预览图片
      isSeckill: false,
      course: {
        courseName: '',
        brief: '',
        teacherDTO: {
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: '',
        discounts: '',
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 1,
        sales: '',
        activityCourse: false,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    };
  },
  created () {
    if (this.courseId) {
      this.loadCourse();
    }
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId);
      this.course = data.data;
    },
    prevStep () {
      this.activeStep--;
    },
    nextStep () {
      this.activeStep++;
    },
    async handleSave () {
      const { data } = await saveOrUpdateCourse(this.course);
      const text = this.courseId ? '课程编辑' : '课程添加';
      if (data.code === '000000') {
        this.$message.success(text + '成功');
        this.$router.back();
      } else {
        this.$message.error(text + '失败');
      }
    }
  },
  components: {
    imgUpload,
    textEditor
  }
});
</script>
