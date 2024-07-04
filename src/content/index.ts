import './index.less'
import * as _ from 'lodash'
// import { sendMessageToTabs } from '@/utils'

document.addEventListener('DOMContentLoaded', () => {
  // setTimeout(() => {
  //   document.title = '测试'
  //   const div = document.createElement('img')
  //   div.alt = '这是一段文字'
  //   div.src = 'http://127.0.0.1:5500/img/system.png'
  //   div.className = 'not-opacity'
  //   document.body.insertBefore(div, document.body.firstChild)
  // }, 2000)
  // sendMessageToTabs({ greeting: 'setDefaultColor' })
  replagePhone()
  document.addEventListener('mouseover', () => {
    replagePhone()
  })
})

let hxReplagePhoneTimer = null
let time = 0
let total = 10
function replagePhone() {
  clearInterval(hxReplagePhoneTimer)
  time = 0

  hxReplagePhoneTimer = setInterval(() => {
    time++
    if (time >= total) {
      clearInterval(hxReplagePhoneTimer)
      return
    }

    const test = /^(\d{3})(\d{1,4})(\d{1,4})$/

    const table = document.querySelector('.table-section .el-table__body-wrapper')
    const result = Array.from($(table).find('tr')).map((item) => {
      const td = Array.from($(item).find('td'))
        .slice(2, 5)
        .map((item, index) => {
          const text = $(item).text()
          if (typeof text === 'string' && text.length === 11 && text.match(test)) {
            $(item)
              .find('.phone')
              .text(getPhone(text))
          }
        })
      return td
    })

    if(result.length) {
      clearInterval(hxReplagePhoneTimer)
      return
    }

    // 旧系统
    const oldResult = Array.from($('.arco-table').find('tbody').find('tr')).map((item, index) => {
      const td = Array.from($(item).find('td'))
        .slice(0, 2)
        .map((item, i) => {
          if(i === 0) {
            if(!$(item).find('.arco-table-cell .index-number').length) {
              $(item).find('.arco-table-cell').append($(`<span class="index-number">${index + 1}</span>`))
            }
          } else {
            const text = $(item).text()
            if (typeof text === 'string' && text.length === 11 && text.match(test)) {
              $(item)
                .find('.arco-table-td-content>span')
                .text(getPhone(text))
            }
          }
        })
      return td
    })

    if(oldResult.length) {
      clearInterval(hxReplagePhoneTimer)
    }

    function getPhone(phone) {
      if (isNaN(phone)) {
        return phone
      }

      return phone.replace(test, '$1 $2 $3')
    }
  }, 1000)
}

const contentScript = {
  async catchElement(req?: any, callback = () => {}) {
    callback()
  },
  async unCatchElement(req?: any, callback = () => {}) {
    callback()
  },
  async getTable(req?: any, callback = (any) => {}) {
    const table = document.querySelector('.table-section .el-table__body-wrapper')
    const arr = Array.from($(table).find('tr'))
      .map((item) => {
        const td = Array.from($(item).find('td'))
          .slice(2, 5)
          .map((item, index) => {
            if (index === 2) {
              return $(item)
                .text()
                .trim()
                .split(' ')[0]
            } else {
              return $(item)
                .text()
                .replace(/\s+/g, '')
            }
          })
        return td
      })
      .filter((item) => {
        return !(item[2] === '1' || item[2].includes('无法接通') || item[2].includes('通话中'))
      })
      .map((item) => {
        return item.join('\t')
      })
    const text = arr.join('\n')
    callback({
      text,
    })
  },
  default(callback) {
    callback('not set')
  },
}
chrome.runtime.onMessage.addListener((req, sender, callback) => {
  const fn = contentScript[req.greeting || 'default'] || contentScript.default
  fn(req, callback)
})
