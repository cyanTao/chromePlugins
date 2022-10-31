const storeKey = 'myKey'
// chrome.storage.sync.set({
//     [key]: value,
//   })

chrome.storage.sync.get(storeKey, (data) => {
  if (data[storeKey]) {
    $('#input').val(data[storeKey])
  }
})

$('.btn').on('click', function () {
  if (!$('#input').val()) {
    alert('输入框')
    return
  }
  chrome.storage.sync.set({
    [storeKey]: $('#input').val()
  })
  // 获取当前tab页
  var queryInfo = {
    active: true,
    currentWindow: true,
  }

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0]

    var url = tab.url
    console.log(tabs, url)
    console.log(tab.id)

    //  * 谷歌插件向浏览器发送消息
    chrome.tabs.sendMessage(tab.id, {
      type: 'setPassword',
      data: $('#input').val()
    }, function (e) {
      console.log(e)
    })

  })


})

$('.openTab').on('click', function () {
  chrome.tabs.create({
    active: true,
    url: 'http://baidu.com',
  })
})

$('.switchTab').on('click', function () {
  chrome.tabs.query({}, (tabs) => {
    chrome.tabs.update(tabs[0].id, {
      active: true
    }, function (e) {
      console.log(e)
    })
  })
})

$('.closeTab').on('click', function () {
  chrome.tabs.query({}, (tabs) => {
    chrome.tabs.remove([tabs[0].id])
  })
})