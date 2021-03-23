<template>
  <div class="flex-1 h-screen p-8">
    <div class="flex">
      <div class="flex-1 px-4 py-2 border border-gray-300 border-solid rounded bg-gray-100">
        <input
          class="w-full bg-transparent outline-none tracking-wider"
          placeholder="回车创建 todo"
          v-model="inputValue"
          @keydown="handleKeyDown"
        />
      </div>
      <el-button class="ml-4 font-normal">日期筛选</el-button>
    </div>
    <div class="mt-4" @drop="handleDrop">
      <div
        class="flex items-center mb-4 pl-2 py-2 todo-width border-l-4 rounded bg-white cursor-pointer shadow-sm hover:bg-gray-100"
        :class="getTodoClass(todo)"
        v-for="(todo, index) in todos"
        :key="index"
        :draggable="true"
        :data-index="todo.id"
        @click="() => handleShowDrawer(todo)"
        @dragstart="(e) => handleDragStart(e, todo.id)"
        @dragover="(e) => handleDragOver(e, todo.id)"
      >
        <el-checkbox class="ml-2" v-model="todo.done" @change="handleCheckboxChange(todo)">
          {{ todo.title }}
        </el-checkbox>
      </div>
      <el-empty v-if="!todos.length" class="mt-32"/>
    </div>
    <el-drawer :with-header="false" v-model="showDrawer" @close="handleCloseDrawer">
      <todo-detail
        :todo="currTodo"
        @desc-change="handleDescChange"
        @end-date-change="handleEndDateChange"
        @priority-change="handlePriorityChange"
        @delete-todo="handleDeleteTodo"
      />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { ITodo } from '@/types'
import TodoDetail from '@/components/TodoDetail.vue'

let dragTargetId = ''

interface IState {
  showDrawer: boolean
  currTodo?: ITodo
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
  components: { TodoDetail },
  name: 'Todo',

  data(): IState {
    return {
      showDrawer: false,
      currTodo: emptyTodo
    }
  },

  // TODO: 为啥 showDrawer 放在 setup() 里只能响应变化一次？
  // TODO: setup() 具体是啥机制呢？
  setup() {
    return {
      inputValue: ''
    }
  },

  computed: {
    todos() {
      return this.$store.state.todo.todos
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

    addTodo(todo: ITodo) {
      const { getters, commit } = this.$store
      commit('addTodo', { id: getters.nextId, ...todo })
    },

    handleKeyDown(e: any) {
      if (e.keyCode === 13) {
        this.addTodo({ title: this.inputValue, done: false })
        this.inputValue = ''
      }
    },

    // TODO: 黑人问号？？？为啥可以自动更新 todo.done？？
    handleCheckboxChange(todo: ITodo) {
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
    },

    handlePriorityChange(index: number) {
      this.currTodo = { ...this.currTodo, priorityType: index }
      this.$store.commit('updateTodo', this.currTodo)
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

      dragTargetId = ''
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
</style>
