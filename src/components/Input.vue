<template>
  <div class="flex-1 px-4 py-2 border border-gray-300 border-solid rounded bg-gray-100">
    <input
      class="w-full bg-transparent outline-none tracking-wider"
      :placeholder="placeholder"
      v-model="value"
      @change="handleChange"

    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',

  props: {
    type: {
      type: String,
      default: 'text'
    },

    placeholder: {
      type: String,
      default: '回车创建 todo'
    }
  },

  data() {
    return {
      value: ''
    }
  },

  methods: {
    handleChange() {
      this.$emit('input-change', this.value)
      // 搜索框回车后不清空搜索词
      if (this.type !== 'search') this.value = ''
    }
  }
})
</script>
