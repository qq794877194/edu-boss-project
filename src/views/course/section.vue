<template>
  <div class="course-section">
    <el-card>
      <div slot="header" class="m-list list-justify">
        <span>课程名称</span>
        <el-button @click="openSection()">添加章节</el-button>
      </div>
      <el-tree
        :data="sections"
        draggable
        :props="defaultProps"
        @node-drop="handleDrop"
        :allow-drop="handleAllowDrop" >
        <div class="m-list list-justify list-inner pdtb10" slot-scope="{node ,data}">
          <span>{{node.label}}</span>
          <div v-if="!data.theme">
            <el-link type="primary" class="mr15" @click="openSection(data)">编辑</el-link>
            <el-link type="primary" class="mr15" @click="openLesson(data)">添加课时</el-link>
            <el-link type="primary">状态</el-link>
          </div>
          <div v-else>
            <el-link type="primary" class="mr15" @click="openLesson(data)">编辑</el-link>
            <el-link type="success" class="mr15" @click="$router.push({
            name: 'course-video',
            params: {courseId},
             query:{sectionId: node.parent.id, lessonId: data.id}})">上传视频</el-link>
            <el-link type="primary">状态</el-link>
          </div>
        </div>
      </el-tree>
      <el-dialog :visible="lessonSwitch" :title="lesson.id ? '编辑课时' : '添加课时'" @close="closeLesson" :close-on-click-modal="false">
        <lessonCreateOrUpdate v-if="lessonSwitch" :lesson="lesson" @success="closeLesson(true)" @cancel="closeLesson" />
      </el-dialog>
      <el-dialog :visible="sectionSwitch" :title="lesson.id ? '编辑章节' : '添加章节'" @close="closeSection" :close-on-click-modal="false">
        <sectionCreateOrUpdate v-if="sectionSwitch" :section="section" @success="closeSection(true)" @cancel="closeSection" />
      </el-dialog>

    </el-card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLesson, getCourseById } from '@/api/course';
import lessonCreateOrUpdate from './components/lessonCreateOrUpdate.vue';
import sectionCreateOrUpdate from './components/sectionCreateOrUpdate.vue';
export default Vue.extend({
  name: 'course-section',
  props: {
    courseId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      course: { courseName: '', id: '' },
      lesson: {},
      section: {},
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label: (data: any) => {
          return data.theme || data.sectionName;
        }
      },
      lessonSwitch: false,
      sectionSwitch: false
    };
  },
  created () {
    this.loadCourse().then(() => {
      this.loadSections();
    });
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById(this.courseId);
      this.course = data.data;
    },
    async loadSections () {
      const { data } = await getSectionAndLesson(this.courseId);
      data.data.forEach((item: any) => {
        item.courseName = this.course.courseName;
        item.sectionId = item.id;
        if (item.lessonDTOS) {
          item.lessonDTOS.forEach((le: any) => {
            le.courseName = this.course.courseName;
            le.sectionName = item.sectionName;
          });
        }
      });
      this.sections = data.data;
    },
    openLesson (info: any) {
      if (info) {
        const obj: any = {
          courseId: info.courseId,
          courseName: info.courseName,
          sectionId: info.sectionId,
          sectionName: info.sectionName
        };
        if (info.theme) {
          obj.theme = info.theme;
          obj.duration = info.duration - 0;
          obj.isFree = info.isFree;
          obj.status = info.status;
          obj.id = info.id;
          obj.orderNum = info.orderNum;
        }
        this.lesson = obj;
      }
      this.lessonSwitch = true;
    },
    closeLesson (reload: any) {
      this.lesson = {};
      this.lessonSwitch = false;
      if (reload) {
        this.loadSections();
      }
    },
    openSection (info: any) {
      if (info) {
        this.section = info;
      } else {
        this.section = {
          courseId: this.course.id,
          courseName: this.course.courseName
        };
      }
      this.sectionSwitch = true;
    },
    closeSection (reload: any) {
      this.section = {};
      this.sectionSwitch = false;
      if (reload) {
        this.loadSections();
      }
    },
    handleAllowDrop (draggingNode: any, dropNode: any, type: any) {
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner';
    },
    async handleDrop (dragNode: any, dropNode: any, type: any, event: any) {
      const fn = dragNode.data.sectionName ? saveOrUpdateSection : saveOrUpdateLesson;
      try {
        await Promise.all([
          fn({ id: dragNode.data.id, orderNum: dropNode.data.orderNum }),
          fn({ id: dropNode.data.id, orderNum: dragNode.data.orderNum })
        ]);
        this.$message.success('排序修改成功');
      } catch (e) {
        console.log(e);
        this.$message.error('排序修改失败');
      }
    }
  },
  components: {
    lessonCreateOrUpdate,
    sectionCreateOrUpdate
  }
});
</script>

<style>
.el-tree-node__content{
  height: auto;
}
</style>
