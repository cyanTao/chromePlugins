<template>
  <section class="body">
    <el-button type="primary">执行</el-button>
    <el-button>执行</el-button>
    <form action="">
      <input name="name" type="text" />
      <input name="password" type="text" />
    </form>
  </section>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      className: 'dom-hover-style',
    }
  },

  components: {},

  computed: {},

  watch: {},

  methods: {},

  created() {
    $(window).on(
      'mousemove',
      _.debounce((e) => {
        $(e.target).addClass(this.className)
      })
    )
    // window.addEventListener('mousemove', function (e) {
    //   console.log(e)
    //   $(e.target).addClass('dom-hover-style')
    // })
    // window.addEventListener('mouseleave', function (e) {
    //   $(e.target).removeClass('dom-hover-style')
    // })
  },
}
</script>
<style lang='less' scoped>
.dom-hover-style {
  border: 2px solid red !important;
}
</style>
