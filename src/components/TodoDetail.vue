<template>
  <div class="h-screen p-6 antialiased">
    <div class="flex justify-between items-center py-2 w-full">
      <el-dropdown>
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
      <el-dropdown>
        <el-button
          class="bg-gray-300 border-gray-300"
          icon="el-icon-more"
          size="mini"
          type="info"
          circle
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>完成</el-dropdown-item>
            <el-dropdown-item>移动至</el-dropdown-item>
            <el-dropdown-item @click="openConfirmBox">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-divider class="mt-2 mb-4"/>
    <el-input class="title-input" v-model="todo.title" />
    <el-input
      class="mt-1"
      type="textarea"
      :autosize="{ minRows: 1, maxRows: 4 }"
      placeholder="添加描述"
      v-model="todo.desc"
      @change="value => $emit('desc-change', value)"
    />
    <el-divider class="mt-4 mb-2"/>
    <div class="flex items-center mt-3 mb-2 text-gray-500">
      <i class="el-icon-date"/>
      <p class="ml-2 text-sm">截止日期</p>
    </div>
    <el-date-picker
      type="date"
      placeholder="设定截止日期"
      v-model="todo.endDate"
      @change="value => $emit('end-date-change', value.toLocaleDateString())"
    />
    <el-divider class="mt-4 mb-2"/>
    <div class="flex items-center mt-3 mb-2 text-gray-500">
      <i class="el-icon-stopwatch"/>
      <p class="ml-2 text-sm">优先级</p>
    </div>
    <el-dropdown trigger="click" @command="index => $emit('priority-change', index)">
      <div>
        <span v-if="!priority">设定优先级</span>
        <el-tag v-else :type="priority.type">{{ priority.name }}</el-tag>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            class="my-2"
            v-for="option in priorityOptions"
            :key="option.key"
            :command="option.key"
          >
            <el-tag :type="option.type">{{ option.name }}</el-tag>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-divider class="mt-4 mb-2"/>
      <div class="flex items-center mt-3 mb-2 text-gray-500">
        <i class="el-icon-files"/>
        <p class="ml-2 text-sm">添加子任务</p>
      </div>
      <el-input placeholder="添加子任务"/>
    <el-divider class="mt-4 mb-2"/>
    <div>
      <div class="flex items-center mt-3 mb-2 text-gray-500">
        <i class="el-icon-tickets"/>
        <p class="ml-2 text-sm">todo 动态</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElMessageBox } from 'element-plus'

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
  },

  computed: {
    priority: function(context: any) {
      const { priorityType } = context.todo

      if (typeof priorityType === 'number') {
        return PRIORITY_OPTIONS[priorityType]
      }
    }
  },

  methods: {
    openConfirmBox() {
      ElMessageBox.confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete-todo')
        this.$message.success('已成功删除')
      }).catch(() => {
        this.$message('已取消')
      })
    }
  }
})
</script>

<style>
.el-input__inner, .el-textarea__inner {
  padding: 5px 0;
  border: none;
  resize: none;
}

.el-input__prefix {
  display: none;
}

.el-input--prefix .el-input__inner {
  padding-left: 0;
}

.title-input input {
  font-size: 1.6rem;
  font-weight: 500;
}
</style>
