<template>
  <section style="width: 500px; height: 500px">
    <el-button style="float: right;background-color: #7262fd;border-color: #7262fd;" type="primary" @click="getTable">提取表格</el-button>
    <!-- <el-button style="float: right;background-color: #9661BC;border-color: #9661BC;" type="primary" @click="getTable">提取表格</el-button> -->
    <!-- <el-form ref="form" label-width="120px" label-position="right">
      <el-form-item label="背景颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @change="backgroundColorChange"
        >
        </el-color-picker>
      </el-form-item>
      <el-form-item label="输入框颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @change="backgroundColorChange"
        >
        </el-color-picker>
      </el-form-item>
    </el-form> -->
  </section>
</template>

<script>
import {
  changeBackgroundColor,
  getSavedBackgroundColor,
  saveBackgroundColor,
} from '@/background/action'
import { copyText, getCurrentTab, sendMessage } from '@/utils'

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
    getTable() {
      /**
       * 获取当前标签页的信息，并向该标签页发送消息请求表格数据，最后复制接收到的表格数据。
      */
      getCurrentTab().then(({ id }) => {
        sendMessage(id, { greeting: 'getTable' }).then(({ text }) => {
          copyText(text)
        }).catch(e => {
          this.$message.error(e)
        })
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
