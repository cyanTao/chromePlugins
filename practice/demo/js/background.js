// 谷歌插件接收来自浏览器的消息
// @ts-ignore: Unreachable code error
chrome.extension.onMessage.addListener(function (data, from, callback) {
  if (data.type === 'getPassword') {
    const storeKey = 'myKey'
    chrome.storage.sync.get(storeKey, (data) => {
      if (data[storeKey]) {
        chrome.tabs.sendMessage(from.tab.id, {
          type: 'setPassword',
          data: data[storeKey]
        }, function (e) {
          console.log(e)
        })
      }
    })


  }
})