document.addEventListener('DOMContentLoaded', () => {
  // 初始化列表
  getSavedJobList(list => {
    renderSelect(list)
    getStorage('jobValue', function (val) {
      $('#jobList').val(val)
      fillItemForm()
    })
  })

  $('#jobList').change(function (event) {
    const val = event.target.value
    setStorage('jobValue', val)
    fillItemForm()
  })

  function fillItemForm() {
    getSavedJobList(list => {
      const value = list.find(item => item.key === $('#jobList').val())
      const {
        key,
        ...others
      } = value
      for (let key in others) {
        $(`#${key}`).val(others[key])
      }
    })
  }

  function getForm() {
    const field = ['keyName', 'taskName', 'env', 'gitBranch']
    const form = {}
    field.map(item => {
      form[item] = $(`#${item}`).val()
    })
    if (Object.values(form).find(item => !item) !== undefined) {
      alert('不能为空')
      return false
    }
    return form
  }

  $('.add').click(function () {
    const form = getForm()
    form && getSavedJobList(list => {
      form.key = `${form.keyName}-${new Date().getTime()}`
      const result = list.concat([form])
      saveJobList(result)
      renderSelect(result)
    })
  })

  $('.edit').click(function () {
    const form = getForm()
    form && getSavedJobList(list => {
      const currentKey = $('#jobList').val()
      form.key = currentKey
      const index = list.findIndex(item => item.key === currentKey)
      list[index] = form
      saveJobList(list)
      renderSelect(list)
    })
  })

  $('.delete').click(function () {
    getSavedJobList(list => {
      const currentKey = $('#jobList').val()
      const index = list.findIndex(item => item.key === currentKey)
      list.splice(index, 1)
      saveJobList(list)
      renderSelect(list)
    })
  })

  $('.do').click(function () {
    getSavedJobList(list => {
      const value = list.find(item => item.key === $('#jobList').val())
      jumpJenkis(tabId => {
        chrome.tabs.sendMessage(tabId, {
          greeting: 'building',
          value
        }, (res) => {
          console.log(res)
        })
      })
    })

  })

  $('.clear').click(function () {
    if (!confirm('确定要清空吗?')) {
      return
    }
    saveJobList([])
    renderSelect([])
  })

  $('.plus').click(function () {
    $(this).addClass('hide')
    $('.less').removeClass('hide')
    $('.form').removeClass('hide')
  })
  $('.less').click(function () {
    $(this).addClass('hide')
    $('.plus').removeClass('hide')
    $('.form').addClass('hide')
  })


});


function jumpJenkis(callback = () => {}) {
  getCurrentTab((tab) => {
    chrome.tabs.update(tab.id, {
      url: 'http://js-op.vipthink.cn/job/tao.tao/build?delay=0sec'
    }, () => {
      callback(tab.id)
    })
  });

}

function renderSelect(list) {
  const doms = list.map(item => `<option value="${item.key}">${item.keyName}</option>`)
  $('#jobList').html(doms)
}

function getCurrentTab(callback) {
  return new Promise((resolve) => {
    var queryInfo = {
      active: true,
      currentWindow: true
    };

    chrome.tabs.query(queryInfo, (tabs) => {
      var tab = tabs[0];

      var url = tab.url;
      console.assert(typeof url == 'string', 'tab.url should be a string');

      callback(tab);
    });
  })

}

function executeScript(script = 'alert(123)') {
  chrome.tabs.executeScript({
    code: script
  });
}

function getSavedJobList(callback) {
  chrome.storage.sync.get('jobList', (data) => {
    callback(chrome.runtime.lastError ? null : (data['jobList'] || []));
  });
}

function saveJobList(list) {
  setStorage('jobList', list)
}

function getStorage(key, callback) {
  chrome.storage.sync.get(key, (data) => {
    callback(chrome.runtime.lastError ? null : (data[key] || null));
  });
}

function setStorage(key, value) {
  chrome.storage.sync.set({
    [key]: value
  });
}