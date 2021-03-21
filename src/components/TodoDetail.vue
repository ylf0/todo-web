<template>
  <div class="h-screen p-6 antialiased">
    <div class="flex justify-between items-center py-2 w-full">
      <el-dropdown trigger="click">
        <span>收集箱</span>
        <i class="el-icon-arrow-down ml-1"/>
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
      v-model="todo.desc"
      @change="value => $emit('desc-change', value)"
    />
    <el-divider class="mt-4 mb-2"/>
    <p class="mb-2 text-sm text-gray-500">截止日期</p>
    <el-date-picker
      type="date"
      placeholder="设定截止日期"
      v-model="todo.endDate"
      @change="value => $emit('end-date-change', value)"
    />
    <el-divider class="mt-4 mb-2"/>
    <p class="mb-2 text-sm text-gray-500">优先级</p>
    <el-dropdown trigger="click" @command="index => $emit('priority-change', index)">
      <span>{{ typeof todo.priorityType === 'number' ? priorityOptions[todo.priorityType].name : '设定优先级' }}</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="option in priorityOptions"
            :key="option.key"
            :command="option.key"
          >
            {{ option.name }}
          </el-dropdown-item>
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

import { PRIORITY_OPTIONS } from '@/constants'

export default defineComponent({
  name: 'TodoDetail',

  props: {
    todo: Object
  },

  data() {
    return {
      // TODO: 常量怎么在 <template/> 里使用呢？
      priorityOptions: PRIORITY_OPTIONS
    }
  }
})
</script>

<style>
.el-textarea__inner {
  padding: 5px 0;
  border: none;
  resize: none;
}
</style>
