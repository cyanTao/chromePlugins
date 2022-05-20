<template>
  <section class="body" :class="{ expand: isExpand }">
    <el-button type="primary" @click="loopDom">显示</el-button>
    <!-- 非编辑模式 -->
    <template v-if="!editMode">
      <el-row class="header-row">
        <el-col :span="12">
          <el-checkbox class="expend-checkbox" v-model="isExpand">展开</el-checkbox>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-button type="primary" @click="doJenkins">执行</el-button>
        </el-col>
      </el-row>
      <el-row class="mt15">
        <el-select v-model="mode" @change="selectChange">
          <el-option
            v-for="(item, index) in modeList"
            :key="index"
            :value="item.value"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-row>
      <template v-if="isExpand">
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
      <el-form class="mt15" ref="formRef" :model="{ name: formName, formValueList }">
        <el-form-item
          label="配置名称"
          prop="name"
          :rules="[{ required: true, message: '请输入配置名称', trigger: 'blur' }]"
        >
          <el-input v-model="formName" placeholder="请输入配置名称"></el-input>
        </el-form-item>
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
          <el-button type="primary" @click="confirmEdit">确认</el-button>
        </el-form-item>
      </el-form>
    </template>
  </section>
</template>

<script>
import * as Utils from '@/utils'
import _ from 'lodash'
import { KEY } from '@/config'
export default {
  data() {
    return {
      // 是否展开
      isExpand: false,
      // 编辑模式
      editMode: false,
      // 抓取模式
      catchMode: false,
      mode: '',
      modeList: [],
      editInfo: {},
      formValueList: [],
      formName: '',
    }
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
    async doJenkins() {
      const { id: tabId } = await Utils.tabCreate({ url: 'http://baidu.com', active: false })
      const queue = (await Utils.getStorage(KEY.queueStorageKey)) || []
      Utils.setStorage(
        KEY.queueStorageKey,
        queue.concat([
          { tabId, message: { greeting: 'doJenkins', value: this.getCurrentSelect() } },
        ])
      )
    },
    // 记录默认选中
    selectChange() {
      this.setModeStorage()
    },
    // 编辑模式
    editForm(isAdd) {
      if (isAdd) {
        this.editInfo = {}
        this.formValueList = []
        this.formName = ''
      } else {
        const target = this.getCurrentSelect()
        this.editInfo = target
        this.formName = target.name
        this.formValueList = _.cloneDeep(target.formValue)
      }
      this.editMode = true
    },
    getCurrentSelect(isIndex = false) {
      const index = this.modeList.findIndex((item) => item.value === this.mode)
      return isIndex ? index : _.cloneDeep(this.modeList[index])
    },
    // 确认添加/编辑
    confirmEdit() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          if (!this.formValueList.length) {
            await this.$confirm('确定不配置任何配置项吗?')
          }
          const isEdit = !!Object.keys(this.editInfo).length
          this.editMode = false
          const value = _.cloneDeep({
            name: this.formName,
            formValue: this.formValueList,
            value: isEdit ? this.editInfo.value : Date.now() + '-' + parseInt(Math.random() * 100),
          })
          // 编辑
          if (isEdit) {
            const index = this.getCurrentSelect(true)
            this.modeList[index] = value
          } else {
            this.modeList.push(value)
          }
          this.$message.success(isEdit ? '修改成功' : '添加成功')

          this.setStorage()
        }
      })
    },
    // 删除当前选项
    async deleteItem() {
      if (this.modeList.length <= 1) {
        return this.$message.error('只剩最后一项了,不能删除哦')
      }
      const index = this.getCurrentSelect(true)
      await this.$confirm(`确认删除选项“${this.modeList[index].name}”吗?`)
      this.modeList.splice(index, 1)
      this.mode = this.modeList[0].value
      this.setStorage()
      this.setModeStorage()
    },
    // 设置配置缓存
    setStorage() {
      Utils.setStorage(KEY.jenkinsStorageKey, this.modeList)
    },
    // 设置默认选中缓存
    setModeStorage() {
      Utils.setStorage(KEY.jenkinsLastChoose, this.mode)
    },
    // 点击抓取按钮
    async catchForm(type, sendMess = true) {
      this.catchMode = type
      if (sendMess) {
        const tabId = await Utils.jumpJenkis()
        Utils.sendMessage(tabId, { greeting: type ? 'catchElement' : 'unCatchElement' })
      }
    },
    // 添加谷歌插件的监听
    addListener() {
      chrome.extension?.onMessage.addListener((request) => {
        const fn = {
          catchForm: () => this.catchForm(false, request.value, false),
          setFormValue: () => {
            this.formValueList = request.value
          },
        }[request.greeting || 'default']
        typeof fn === 'function' && fn()
      })
    },
    // 获取缓存的配置
    async getStorageSetting() {
      const [modeList, mode] = await Promise.all([
        Utils.getStorage(KEY.jenkinsStorageKey),
        Utils.getStorage(KEY.jenkinsLastChoose),
      ])
      // 没配置, 帮它写配置
      if (!modeList) {
        this.modeList = [
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
        ]
        this.setStorage()
      } else {
        this.modeList = modeList
      }
      // 没默认选中,默认选中第一个
      if (!mode) {
        this.mode = this.modeList[0].value
        this.setModeStorage()
      } else {
        this.mode = mode
      }
    },
  },

  created() {
    this.addListener()
    this.getStorageSetting()
  },
}
</script>
<style lang='less' scoped>
.body {
  width: 200px;
  height: 200px;
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
