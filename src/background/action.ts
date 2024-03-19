import { KEY } from '@/config'
import * as Util from '@/utils'
// 检查并执行队列
export async function checkQueue(req, from) {
  const { id: tabId } = from.tab
  const queue: any = (await Util.getStorage(KEY.queueStorageKey)) || []
  const index = queue.findIndex((item) => item.tabId === tabId)
  const target = queue[index]
  target &&
    Util.sendMessage(target.tabId, target.message).then(() => {
      queue.splice(index, 1)
      Util.setStorage(KEY.queueStorageKey, queue)
    })
}

export function setDefaultColor(req, from) {
  getSavedBackgroundColor(from.origin, (color) => {
    if (color) {
      changeBackgroundColor(color)
    }
  })
}

// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
export function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true,
  }

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0]

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string')

    callback(url)
  })

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, (tabs) => {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * Change the background color of the current page.
 *
 * @param {string} color The new background color.
 */
export function changeBackgroundColor(color) {
  chrome.tabs.insertCSS(null, {code: `* { background-color: ${color || 'unset'} !important;color:black;font-weight: bolder !important; }`});
  // var script = `
  //   document.body.style.backgroundColor="${color}";
  //   document.querySelectorAll('*').forEach(item => {
  //     if('${color || ''}') {
  //       const beforeColor = item.style.backgroundColor
  //       item.setAttribute('back-background', beforeColor)
  //       item.style.backgroundColor = beforeColor || '${color}';
  //     } else {
  //       const cc = item.getAttribute('back-background') || ''
  //       item.style.backgroundColor = cc;
  //     }
  //   })
  // `
  // chrome.tabs.executeScript({
  //   code: script,
  // })
}

/**
 * Gets the saved background color for url.
 *
 * @param {string} url URL whose background color is to be retrieved.
 * @param {function(string)} callback called with the saved background color for
 *     the given url on success, or a falsy value if no color is retrieved.
 */
export function getSavedBackgroundColor(url, callback) {
  // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
  // for chrome.runtime.lastError to ensure correctness even when the API call
  // fails.
  chrome.storage.sync.get(url, (items) => {
    callback(chrome.runtime.lastError ? null : items[url])
  })
}

/**
 * Sets the given background color for url.
 *
 * @param {string} url URL for which background color is to be saved.
 * @param {string} color The background color to be saved.
 */
export function saveBackgroundColor(url, color) {
  var items = {}
  items[url] = color
  // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
  // optional callback since we don't need to perform any action once the
  // background color is saved.
  chrome.storage.sync.set(items)
}
