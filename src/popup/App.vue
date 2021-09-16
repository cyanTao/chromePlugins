<template>
  <section class="body" :class="{ expand: isExpand }">
    <!-- 非编辑模式 -->
    <template v-if="!editMode">
      <el-row class="header-row">
        <el-col span="12">
          <el-button type="primary">执行</el-button>
        </el-col>
        <el-col span="12">
          <el-checkbox class="expend-checkbox" v-model="isExpand">展开</el-checkbox>
        </el-col>
      </el-row>
      <template v-if="isExpand">
        <el-row class="mt15">
          <el-select v-model="mode">
            <el-option
              v-for="(item, index) in modeList"
              :key="index"
              :value="item.value"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-row>
        <el-row class="mt15">
          <el-button type="success" @click="editMode = true">新增</el-button>
          <el-button type="default" @click="editMode = true">编辑</el-button>
          <el-button type="danger" @click="deleteItem">删除</el-button>
        </el-row>
      </template>
    </template>

    <!-- 编辑模式 -->
    <template v-if="editMode">
      <el-button v-if="!catchMode" type="success" @click="catchForm(true)">抓取表单内容</el-button>
      <el-button v-else type="info" @click="catchForm(false)">退出抓取</el-button>
      <el-divider></el-divider>
      <el-form class="mt15" ref="formRef">
        <el-form-item v-for="(item, index) in formValueList" :key="index">
          <el-input v-model="item.name" placeholder="请输入name"> </el-input>
          <el-input v-model="item.value" placeholder="请输入value"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" circle> + </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="editMode = false">取消</el-button>
          <el-button type="primary" @click="editOperate">确认</el-button>
        </el-form-item>
      </el-form>
    </template>
  </section>
</template>

<script>
import * as Utils from '@/utils'
export default {
  data() {
    return {
      // 是否展开
      isExpand: true,
      // 编辑模式
      editMode: true,
      // 抓取模式
      catchMode: false,
      mode: 0,
      modeList: [
        {
          name: 'web_code for 30.15',
          value: 0,
          formValue: [
            {
              name: 'git_url',
              value: 'snc_devcen/frontend/web_code',
            },
            {
              name: 'git_branch',
              value: 'develo',
            },
            {
              name: 'deployIps',
              value: '192.168.30.15',
            },
            {
              name: 'deployCredentials',
              value: 'deploy_192.168.33.126',
            },
            {
              name: 'git_cretificate',
              value: 'cd556c48-2001-4ba1-878c-bef81e3e0b54',
            },
          ],
        },
      ],
      editInfo: {},
      formValueList: [],
    }
  },

  components: {},

  computed: {},

  watch: {},

  methods: {
    editOperate() {
      this.$refs.formRef.validateor((item) => {
        console.log(item)
      })
      console.log()
    },
    async deleteItem() {
      await this.$confirm('确认删除吗?')
      console.log(13)
    },
    async catchForm(type) {
      if (type) {
        this.catchMode = true
      } else {
        this.catchMode = false
      }
      const res = await Utils.jumpJenkis()
      console.log(res)
    },
  },

  created() {},
}
</script>
<style lang='less' scoped>
.body {
  width: 200px;
  &.expand {
    width: 500px;
    height: 300px;
  }
}
.ml15 {
  margin-left: 15px;
}
.mt15 {
  margin-top: 15px;
}
.header-row {
  display: flex;
  align-items: center;
  .expend-checkbox {
    text-align: right;
  }
}
</style>
