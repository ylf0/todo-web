<template>
  <div class="flex-1 h-screen p-8 pt-24 overflow-y-scroll">
    <div class="flex fixed top-0 right-0 p-8 pb-4 w-5/6 bg-white opacity-95 z-10">
      <Input @input-change="handleInputChange"/>
      <el-dropdown @command="handleSelectStatus">
        <el-button class="ml-4 font-normal">筛选列表</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :class="{ 'text-blue-500': status.key === currStatus }"
              v-for="status in statusOptions"
              :key="status.key"
              :command="status.key"
            >
              {{ status.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div @drop="handleDrop" v-infinite-scroll="handleScrollLoad">
      <TodoList
        v-for="todo in todos"
        :key="todo.id"
        :draggable="true"
        :data-index="todo.id"
        :todo="todo"
        @select-todo="handleShowDrawer"
        @dragstart="(e) => handleDragStart(e, todo.id)"
        @dragover="(e) => handleDragOver(e, todo.id)"
      />
      <el-empty v-if="!todos.length" class="empty-content-height"/>
    </div>
    <el-drawer :with-header="false" v-model="showDrawer" @close="handleCloseDrawer">
      <todo-detail
        :todo="currTodo"
        @desc-change="handleDescChange"
        @end-date-change="handleEndDateChange"
        @priority-change="handlePriorityChange"
        @toggle-status="handleToggleStatus"
        @delete-todo="handleDeleteTodo"
      />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { IStatus, ITodo } from '@/types'
import { STATUS_OPTIONS } from '@/constants'

import Input from '@/components/Input.vue'
import TodoList from '@/components/TodoList.vue'
import TodoDetail from '@/components/TodoDetail.vue'

let dragTargetId = ''

interface IState {
  showDrawer: boolean
  statusOptions: IStatus[]
  currStatus: string
  currTodo?: ITodo
  todos: ITodo[]
  pageNum: number
  pageSize: number
}

const emptyTodo: ITodo = {
  id: '',
  title: '',
  done: false,
  desc: '',
  endDate: undefined,
  priorityType: undefined,
  subTaskIds: undefined
}

export default {
  name: 'Todo',

  components: {
    Input,
    TodoList,
    TodoDetail
  },

  data(): IState {
    return {
      showDrawer: false,
      statusOptions: STATUS_OPTIONS,
      currStatus: 'undone',
      currTodo: emptyTodo,
      todos: [],
      pageNum: 1,
      pageSize: 30
    }
  },

  created() {
    this.todos = this.getTodosByPage(1, this.pageSize)
  },

  computed: {

    totalSize() {
      const { getters } = this.$store
      return getters.getTotalSize(this.currStatus)
    },
  },

  methods: {
    getTodoClass(todo: ITodo) {
      const { priorityType } = todo
      return {
        'border-blue-400': priorityType === 1,
        'border-yellow-400': priorityType === 2,
        'border-red-400': priorityType === 3
      }
    },

    getTodosByPage(pageNum: number, pageSize: number): ITodo[] {
      if (pageNum < 1 || pageSize < 0) return []

      const { getters } = this.$store
      return getters.getTodoByPage(pageNum, pageSize, this.currStatus)
    },

    addTodo(todo: ITodo) {
      const { getters, commit } = this.$store
      commit('addTodo', { id: getters.nextId, ...todo })
    },

    handleInputChange(title: string) {
      this.addTodo({ title, done: false })
      if (this.currStatus !== 'done') this.todos.push({ title, done: false })
    },

    handleSelectStatus(key: string) {
      this.pageNum = 1
      this.currStatus = key
      this.todos = this.getTodosByPage(1, this.pageSize)
    },

    handleShowDrawer(todo: ITodo) {
      this.currTodo = todo
      this.showDrawer = true
    },

    handleCloseDrawer() {
      this.currTodo = emptyTodo
      this.showDrawer = false
    },

    handleDescChange(value: string) {
      this.currTodo = { ...this.currTodo, desc: value }
      this.$store.commit('updateTodo', this.currTodo)
    },

    handleEndDateChange(value: any) {
      this.currTodo = { ...this.currTodo, endDate: value.toString() }
      this.$store.commit('updateTodo', this.currTodo)
      this.updateField('endDate')
    },

    handlePriorityChange(index: number) {
      this.currTodo = { ...this.currTodo, priorityType: index }
      this.$store.commit('updateTodo', this.currTodo)
      this.updateField('priorityType')
    },

    handleDeleteTodo() {
      this.$store.commit('deleteTodo', this.currTodo)
      this.showDrawer = false
    },

    handleDragStart(e: any, todoId: string) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('text/plain', todoId)
    },

    handleDragOver(e: any, todoId: string) {
      dragTargetId = todoId
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    },

    handleDrop(e: any) {
      e.preventDefault()
      const sourceId = e.dataTransfer.getData('text/plain')

      this.$store.commit('dragTodo', { sourceId, targetId: dragTargetId })
      this.swapTodoPosition(sourceId, dragTargetId)

      dragTargetId = ''
    },

    handleToggleStatus() {
      this.currTodo = { ...this.currTodo, done: !this.currTodo.done }
      this.$store.commit('updateTodo', this.currTodo)
      this.updateField('done')
    },

    handleScrollLoad() {
      if (this.pageNum >= Math.ceil(this.totalSize / this.pageSize)) return
      this.pageNum += 1

      const lists = this.getTodosByPage(this.pageNum, this.pageSize)
      this.todos = [...this.todos, ...lists]
    },

    updateField(fieldName: string) {
      const target = this.todos.find(todo => todo.id === this.currTodo.id)
      if (target) target[fieldName] = this.currTodo[fieldName]
    },

    swapTodoPosition(sourceId: string, targetId: string) {
      const { todos } = this
      const sourceIndex = todos.findIndex(({ id }) => id === sourceId)
      const targetIndex = todos.findIndex(({ id }) => id === targetId)

      if (sourceIndex !== -1 && targetIndex !== -1) {
        const source = Object.assign({}, todos[sourceIndex])
        const target = Object.assign({}, todos[targetIndex])
        todos.splice(targetIndex, 1, source)
        todos.splice(sourceIndex, 1, target)
      }
    },
  }
}
</script>

<style>
.el-overlay {
  background-color: rgba(0, 0, 0, 0.2);
}

.todo-width {
  width: calc(100% - 114px)
}

.empty-content-height {
  height: calc(100vh - 8rem);
  min-height: 260px;
}
</style>
