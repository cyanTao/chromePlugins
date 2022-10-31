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
