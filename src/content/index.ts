import './index.less'
import * as _ from 'lodash'
import { sendMessageToTabs } from '@/utils'

document.addEventListener('DOMContentLoaded', () => {
  sendMessageToTabs({ greeting: 'setDefaultColor' })
})

const contentScript = {
  async catchElement(req?: any, callback = () => {}) {
    callback()
  },
  async unCatchElement(req?: any, callback = () => {}) {
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
