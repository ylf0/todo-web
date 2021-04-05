<template>
  <div class="h-screen overflow-y-scroll">
    <Input class="h-11" type="search" placeholder="回车搜索 todo" @input-change="handleInputChange"/>
    <el-empty v-if="!lists.length" class="empty-content-height" :description="emptyTips"/>
    <div class="mt-4" v-else>
      <TodoList
        v-for="todo in lists"
        :key="todo.id"
        :searchWord="searchWord"
        :todo="todo"
        @select-todo="handleShowTodoDetail"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ITodo } from '@/constants'
import Input from '@/components/Input.vue'
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'Search',

  components: {
    Input,
    TodoList
  },

  data() {
    return {
      searchWord: '',
      lists: []
    }
  },

  computed: {
    emptyTips() {
      if (!this.lists.length) {
        if (!this.searchWord) return '输入后回车开始搜索吧'
        return `啊偶，暂无 ${this.searchWord} 相关事项`
      }
    }
  },

  methods: {
    handleInputChange(val: string) {
      const { getters } = this.$store
      this.searchWord = val
      this.lists = getters.getSearchTodo(val)
    },

    handleShowTodoDetail(todo: ITodo) {
      console.info('handleShowTodoDetail: ', todo)
    }
  }
}
</script>

<style>
  .empty-content-height {
    height: calc(100vh - 7rem);
    min-height: 260px;
  }
</style>
