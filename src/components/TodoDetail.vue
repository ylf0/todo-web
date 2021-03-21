<template>
  <div class="h-screen p-6 antialiased">
    <div class="flex justify-between items-center w-full">
      <el-dropdown trigger="click">
        <span>收集箱</span>
        <i class="el-icon-arrow-down"/>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>收集箱一</el-dropdown-item>
            <el-dropdown-item>收集箱二</el-dropdown-item>
            <el-dropdown-item>收集箱三</el-dropdown-item>
            <el-dropdown-item>收集箱四</el-dropdown-item>
            <el-dropdown-item>收集箱五</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <i class="el-icon-more"/>
    </div>
    <el-divider class="mt-2 mb-4"/>
    <p class="text-xl font-medium">{{ todo && todo.title }}</p>
    <el-input
      class="mt-1"
      type="textarea"
      :autosize="{ minRows: 1, maxRows: 4 }"
      placeholder="添加描述"
      v-model="desc"
    />
    <el-divider class="mt-4 mb-2"/>
    <p class="mb-2 text-sm text-gray-500">截止日期</p>
    <el-date-picker type="datetime" placeholder="设定截止日期" />
    <el-divider class="mt-4 mb-2"/>
    <p class="mb-2 text-sm text-gray-500">优先级</p>
    <el-dropdown trigger="click">
      <span>设定优先级</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>不紧急</el-dropdown-item>
          <el-dropdown-item>一般</el-dropdown-item>
          <el-dropdown-item>较紧急</el-dropdown-item>
          <el-dropdown-item>紧急</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-divider class="mt-4 mb-2"/>
      <p class="mb-2 text-sm text-gray-500">添加子任务</p>
      <el-input placeholder="添加子任务"/>
    <el-divider class="mt-4 mb-2"/>
    <div>
      <p class="mb-2 text-sm text-gray-500">todo 动态</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TodoDetail',

  data() {
    return {
      desc: ''
    }
  },

  props: {
    todo: Object
  },
})
</script>

<style>
.el-textarea__inner {
  padding: 5px 0;
  border: none;
  resize: none;
}
</style>
