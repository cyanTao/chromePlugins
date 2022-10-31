import * as ACTION from './action'

// 谷歌插件接收来自浏览器的消息
// @ts-ignore: Unreachable code error
chrome.extension.onMessage.addListener(function() {
  const args = Array.prototype.slice.call(arguments)
  const fn = ACTION[args[0].greeting]
  typeof fn === 'function' && fn(...args)
})
