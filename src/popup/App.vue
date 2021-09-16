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
          <el-button type="success" @click="editForm(true)">新增</el-button>
          <el-button type="default" @click="editForm(false)">编辑</el-button>
          <el-button type="danger" @click="deleteItem">删除</el-button>
        </el-row>
      </template>
    </template>
    <!-- 编辑模式 -->
    <template v-if="editMode">
      <el-button v-if="!catchMode" type="success" @click="catchForm(true)">抓取表单内容</el-button>
      <el-button v-else type="info" @click="catchForm(false)">退出抓取</el-button>
      <el-divider></el-divider>
      <el-form class="mt15" ref="formRef" :model="{ formValueList }">
        <el-row v-for="(item, index) in formValueList" :key="index">
          <el-row class="form-row-item">
            <el-col :span="10">
              <el-form-item
                :prop="'formValueList.' + index + '.value'"
                :rules="[{ required: true, message: '请输入name', trigger: 'blur' }]"
              >
                <el-input v-model="item.name" placeholder="请输入name"></el-input
              ></el-form-item>
            </el-col>
            <el-col class="ml15" :span="10">
              <el-form-item
                :prop="'formValueList.' + index + '.value'"
                :rules="[{ required: true, message: '请输入value', trigger: 'blur' }]"
              >
                <el-input v-model="item.value" placeholder="请输入value"></el-input>
              </el-form-item>
            </el-col>
            <i class="delete el-icon-delete" @click="formValueList.splice(index, 1)"></i>
          </el-row>
        </el-row>
        <el-form-item>
          <el-button type="success" @click="formValueList.push({ name: '', value: '' })"
            >添加选项</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button @click="editMode = false">取消</el-button>
          <el-button type="primary" @click="editOperate">确认</el-button>
        </el-form-item>
      </el-form>
    </template>
    <form action="">
      <input name="git_url" type="text" value="1" />
      <input name="git_branch" type="text" value="2" />
      <input name="deployIps" type="checkbox" value="192.168.30.15" />
      <input name="deployIps" type="checkbox" value="192.168.44.18" />
    </form>
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
    editForm(isAdd) {
      if (isAdd) {
        this.editInfo = {}
      } else {
        const target = this.getCurrentSelect()
        this.editInfo = target
        this.formValueList = _.cloneDeep(target.formValue)
      }
    },
    getCurrentSelect(isIndex = false) {
      const index = this.modeList.findIndex((item) => item.value === this.mode)
      return isIndex ? index : _.cloneDeep(this.modeList[index])
    },
    editOperate() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.editMode = false
          // 编辑
          if (Object.keys(editInfo)) {
            this.modeList.push({
              name: this.name,
            })
          } else {
            const index = this.getCurrentSelect(true)
          }
          this.setStorage()
        }
      })
    },
    async deleteItem() {
      await this.$confirm('确认删除吗?')
      const index = this.getCurrentSelect(true)
      this.modeList.splice(index, 1)
      this.setStorage()
    },
    setStorage() {
      console.log(111)
    },
    async catchForm(type, sendMess = true) {
      this.catchMode = type
      console.log(type)
      if (sendMess) {
        const tabId = await Utils.jumpJenkis()
        Utils.sendMessage(tabId, { greeting: type ? 'catchElement' : 'unCatchElement' })
      }
    },
  },

  created() {
    chrome.extension?.onMessage.addListener((request) => {
      const fn = {
        catchForm: () => this.catchForm(false, request.value, false),
        setFormValue: () => {
          this.formValueList = request.value
        },
      }[request.greeting || 'default']
      fn()
    })
  },
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
.form-row-item {
  position: relative;
  .delete {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: red;
    cursor: pointer;
  }
}
</style>
