<template>
  <section>
    <el-button type="primary" @click="loopDom">显示</el-button>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },

  components: {},

  computed: {},

  watch: {},

  methods: {
    loopDom() {
      function loopDom(children) {
        if (children && children.length) {
          Array.from(children).forEach((item) => {
            if (item.style.display === 'none') {
              item.style.display = 'block'
            }
            loopDom(item.children)
          })
        }
      }
      loopDom(document.documentElement.children)
    },
  },

  created() {},
}
</script>
<style lang='less' scoped>
</style>
