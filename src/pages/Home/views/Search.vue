<template>
  <div class="pt-24 h-screen overflow-y-scroll">
    <div class="fixed top-0 right-0 p-8 pb-4 w-5/6 bg-white opacity-95 z-10">
      <Input class="h-11" type="search" placeholder="回车搜索 todo" @input-change="handleInputChange"/>
    </div>
    <el-empty v-if="!lists.length" class="empty-content-height" :description="emptyTips"/>
    <div v-else>
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
import TodoDetail from '@/components/TodoDetail.vue'

export default {
  name: 'Search',

  components: {
    Input,
    TodoList,
    TodoDetail,
  },

  data() {
    return {
      searchWord: '',
      lists: [],
      showDrawer: false,
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
    height: calc(100vh - 8rem);
    min-height: 260px;
  }
</style>
