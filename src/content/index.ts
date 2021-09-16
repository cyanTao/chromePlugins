import './index.less'
import * as _ from 'lodash'

const contentScript = {
  async catchElement(req: any, callback: Function) {
    console.log(req)
    callback()
  },
  async building(req: any, callback: Function) {
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

// $(window).on(
//   'mousemove',
//   _.debounce(function(e) {
//     const className = 'dom-hover-style',
//       key = 'domUniqueCode'

//     const dom = $(e.target)
//     // 非当前选中的一律去掉类名
//     $(`.${className}`).each(function() {
//       if ($(this).attr(key) !== dom.attr(key)) {
//         $(this).removeClass(className)
//       }
//     })

//     // dom生成唯一标识
//     if (!dom.attr(key)) {
//       const domUniqueCode = Date.now() + '-' + Math.random() * 100
//       dom.attr(key, domUniqueCode)
//     }

//     if (!dom.hasClass(className)) {
//       dom.addClass(className)
//     }
//   }, 100)
// )

// $(window).on('click', function(e) {
//   e.preventDefault()
//   console.log(e.target)
//   // $(e.target).addClass('prevent-click')
// })
