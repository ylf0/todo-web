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
      <el-button class="ml-4">Date Filter</el-button>
    </div>
    <div class="mt-4">
      <div
        class="flex items-center py-2 rounded cursor-pointer hover:bg-gray-100"
        v-for="(todo, index) in todos"
        :key="index"
        @click="() => handleShowDrawer(todo)"
      >
        <el-checkbox class="ml-2" v-model="todo.done" @change="handleCheckboxChange(todo)">
          {{ todo.title }}
        </el-checkbox>
      </div>
    </div>
    <el-drawer :with-header="false" v-model="showDrawer" @close="handleCloseDrawer">
      <todo-detail
        :todo="currTodo"
        @desc-change="handleDescChange"
        @end-date-change="handleEndDateChange"
        @priority-change="handlePriorityChange"
      />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { ITodo } from '@/types'
import TodoDetail from '@/components/TodoDetail.vue'

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
    }
  },

  methods: {
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
      this.$store.commit('updateTodo', { ...this.currTodo, desc: value })
    },

    handleEndDateChange(value: any) {
      this.$store.commit('updateTodo', { ...this.currTodo, endDate: value.toString() })
    },

    handlePriorityChange(index: number) {
      this.$store.commit('updateTodo', { ...this.currTodo, priorityType: index })
    },
  }
}
</script>

<style>
.el-overlay {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
