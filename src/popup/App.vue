<template>
  <section style="width: 500px; height: 500px">
    <el-form ref="form" label-width="120px" label-position="right">
      <el-form-item label="背景颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @change="backgroundColorChange"
        >
        </el-color-picker>
      </el-form-item>
      <!-- <el-form-item label="输入框颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @change="backgroundColorChange"
        >
        </el-color-picker>
      </el-form-item> -->
    </el-form>
  </section>
</template>

<script>
import {
  changeBackgroundColor,
  getSavedBackgroundColor,
  saveBackgroundColor,
} from '@/background/action'
import { getCurrentTab } from '@/utils'

export default {
  data() {
    return {
      color: '',
      predefineColors: [
        '#C7EDCC',
        '#282f40',
        '#FAF9DE',
        '#FFF2E2',
        '#FDE6E0',
        '#DCE2F1',
        '#E9EBFE',
        '#EAEAEF',
        '#E3EDCD',
        '#CCE8CF',
        '#6E7B6C',
      ],
    }
  },

  components: {},

  computed: {},

  watch: {},

  methods: {
    backgroundColorChange(value) {
      getCurrentTab().then((res) => {
        const url = new URL(res.url).origin
        changeBackgroundColor(value)
        saveBackgroundColor(url, value)
      })
    },
  },

  created() {
    getCurrentTab().then((res) => {
      const url = new URL(res.url).origin
      getSavedBackgroundColor(url, (color) => {
        this.color = color
      })
    })
  },
}
</script>
<style lang='less' scoped>
</style>
