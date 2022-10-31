import './index.less'
import * as _ from 'lodash'
import { sendMessageToTabs } from '@/utils'

// dom加载完后
$(window).on('load', function() {
  // 检查有没有要执行的队列
  sendMessageToTabs({ greeting: 'checkQueue' })
})

const moveEvent = windowMoveEvent()
const activeClassName = 'dom-active-style',
  hoverClassName = 'dom-hover-style'

const contentScript = {
  async catchElement(req?: any, callback = () => {}) {
    $(`.${activeClassName}`).removeClass(activeClassName)
    $(window).on('mousemove', moveEvent)
    $(window).on('click', windowClickEvent)
    callback()
  },
  async unCatchElement(req?: any, callback = () => {}) {
    $(`.${hoverClassName}`).removeClass(hoverClassName)
    $(window).off('mousemove', moveEvent)
    $(window).off('click', windowClickEvent)
    callback()
  },
  async doJenkins(req, callback) {
    console.log(req)
    alert(11)
    callback()
  },
  async building(req: any, callback = () => {}) {
    console.log(req)
    callback()
  },
  default(callback) {
    callback('not set')
  },
}
chrome.runtime.onMessage.addListener((req, sender, callback) => {
  const fn = contentScript[req.greeting || 'default'] || contentScript.default
  fn(req, callback)
})

function windowMoveEvent() {
  return _.debounce(function(e) {
    const key = 'domUniqueCode'

    const dom = $(e.target)
    // 非当前选中的一律去掉类名
    $(`.${hoverClassName}`).each(function() {
      if ($(this).attr(key) !== dom.attr(key)) {
        $(this).removeClass(hoverClassName)
      }
    })

    // dom生成唯一标识
    if (!dom.attr(key)) {
      const domUniqueCode = Date.now() + '-' + Math.random() * 100
      dom.attr(key, domUniqueCode)
    }

    if (!dom.hasClass(hoverClassName)) {
      dom.addClass(hoverClassName)
    }
  }, 100)
}

function windowClickEvent(e) {
  e.preventDefault()

  $(e.target).addClass(activeClassName)
  contentScript.unCatchElement()
  sendMessageToTabs({ greeting: 'setFormValue', value: getFormValues(e.target) })
  sendMessageToTabs({ greeting: 'catchForm', value: false })
}

function getFormValues(form) {
  const dom = $(form)
  var result = []
  dom.find('input').each(function() {
    const _this = $(this)
    const name = _this.attr('name')
    const value = _this.val()
    const index = result.findIndex((item) => item.name === name)
    if (index !== -1) {
      const val = result[index].value
      result[index].value = val instanceof Array ? val.concat([value]) : [val, value]
    } else {
      result.push({
        name,
        value,
      })
    }
  })
  return result
}
