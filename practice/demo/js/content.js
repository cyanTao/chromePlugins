// window.addEventListener('DOMContentLoaded', function () {
//   setTimeout(() => {
//     chrome.runtime.sendMessage({
//       type: 'getPassword'
//     }, function (e) {
//       console.log(e)
//     })
//   }, 1000)
// })



function writePassword(password) {
  $('#kw').val(password)
}

chrome.runtime.onMessage.addListener((req, sender, callback) => {
  console.log(req)
  if (req.type === 'setPassword') {
    writePassword(req.data)
  }
  callback()
})