chrome.runtime.onMessage.addListener((req, sender, callback) => {
  const fn = contentScript[req.greeting] || (() => callback('not set'))()
  fn(req, callback)
})

const contentScript = {
  async building(req, callback) {
    callback()
    setTimeout(() => {
      const form = $('#main-panel > form')
      const { taskName, env, gitBranch } = req.value
      getTargetDom('PJ').val(taskName)
      getTargetDom('MYENV').val(env)
      form.find('table tbody:nth-child(3) input.setting-input').val(gitBranch)
      $('#yui-gen1-button').click()
      function getTargetDom(key = '') {
        return form.find(`input[value="${key}"]`).next('select')
      }
    }, 1000)
  }
}

const sleep = (time = 0) => new Promise((resolve => setTimeout(resolve, time)))

function setMessageToTabs() {
  chrome.runtime.sendMessage()
}