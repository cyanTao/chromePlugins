console.log(2342323)
const contentScript = {
  async building(req: any, callback: Function) {
    callback();
  },
};
chrome.runtime.onMessage.addListener((req, sender, callback) => {
  const fn = contentScript[req.greeting] || (() => callback('not set'))();
  fn(req, callback);
});

const sleep = (time = 0) => new Promise((resolve) => setTimeout(resolve, time));

function setMessageToTabs() {
  chrome.runtime.sendMessage({});
}
