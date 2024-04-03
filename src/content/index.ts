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
})

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
              return $(item).text().replace(/\s+/g, '')
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
