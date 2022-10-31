/**
 * 设置浏览器后台缓存
 * @param key 缓存健
 * @param value 缓存值
 */
export function setStorage(key: string, value: any) {
  chrome.storage.sync.set({
    [key]: value,
  })
}

/**
 * 获取浏览器后台缓存
 * @param key 缓存key
 * @returns
 */
export function getStorage(key: string) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (data) =>
      resolve(chrome.runtime.lastError ? null : data[key] || null)
    )
  })
}

/**
 * 执行script方法片段的方法
 * @param script 代码片段
 */
export function executeScript(script = 'alert(123)') {
  chrome.tabs.executeScript({
    code: script,
  })
}

/**
 * 获取当前激活页面的tab信息
 * @param {function} callback 回调,返回当前页面的信息
 */
export async function getCurrentTab() {
  return new Promise((resolve) => {
    var queryInfo = {
      active: true,
      currentWindow: true,
    }

    chrome.tabs.query(queryInfo, (tabs) => {
      var tab = tabs[0]

      var url = tab.url
      console.assert(typeof url == 'string', 'tab.url should be a string')

      resolve(tab)
    })
  })
}

/**
 * 新开一个标签页
 * @param param0 [active] 是否激活该标签页 [url] 要跳转的链接
 * @returns
 */
export function tabCreate({ active = true, url = '' }) {
  return new Promise((resolve) => {
    chrome.tabs.create(
      {
        active,
        url,
      },
      resolve
    )
  })
}

/**
 * 跳转到Jenkins页面，并返回tabId
 */
export function jumpJenkis() {
  return new Promise((resolve) => {
    const url = 'http://192.168.32.19:8080/jenkins/job/middle_platform_deploy/build?delay=0sec'

    getCurrentTab().then((tab: { id: number; url: string }) => {
      if (tab.url === url) {
        resolve(tab.id)
      } else {
        chrome.tabs.update(
          tab.id,
          {
            url,
          },
          async () => {
            await sleep(3000)
            resolve(tab.id)
          }
        )
      }
    })
  })
}

/**
 * 谷歌插件向浏览器发送消息
 * @param tabId tab页id
 * @param message 发送的消息
 * @returns Promise
 */
export function sendMessage(
  tabId,
  message = {
    greeting: '',
    value: '',
  }
) {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, message, (res) => resolve(res))
  })
}

/**
 * 浏览器向谷歌插件回发消息
 * @param message 消息内容
 * @returns Promise
 */
export function sendMessageToTabs(message) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message)
  })
}

/**
 * 延时器
 * @param time 延迟的时间,默认0毫秒
 * @returns Promise
 */
export function sleep(time = 0) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

/**
 * 将回调函数转为 promise 的辅助函数
 * @param {function} fn 要转的回调函数
 */
export function promisify(fn: Function): Promise<any> {
  return (function() {
    const args = Array.prototype.slice.call(arguments)
    return new Promise(function(resolve) {
      args.push(function(result) {
        resolve(result)
      })
      fn.apply(null, args)
    })
  })()
}
