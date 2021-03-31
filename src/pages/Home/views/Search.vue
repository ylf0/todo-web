<template>
  <div>
    <Input class="h-11" type="search" placeholder="回车搜索 todo" @input-change="handleInputChange"/>
    <el-empty class="empty-content-height" description="暂无内容哦"/>
  </div>
</template>

<script lang="ts">
import Input from '@/components/Input.vue'

export default {
  name: 'Search',

  components: {
    Input
  },

  methods: {
    handleInputChange(val: string) {
      const { getters } = this.$store
      console.info('getters.getSearchTodo(val): ', getters.getSearchTodo(val))
    }
  }
}
</script>

<style>
  .empty-content-height {
    height: calc(100vh - 5rem);
    min-height: 260px;
  }
</style>
