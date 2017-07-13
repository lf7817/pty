/* eslint-disable no-undef */
define(() => {
  let cache = {}
  return {
    /**
     * 添加定时器
     * @param id 定时器Id
     * @param type 定时器类型 ('timeout','interval')
     */
    add (id, type) {
      cache[id] = { id, type }
    },
    clear (id) {
      if (arguments.length === 0) {
        Object.keys(cache).forEach((key) => {
          if (cache[key].type === 'timeout') {
            clearTimeout(cache[key].id)
          } else {
            clearInterval(cache[key].id)
          }
        })
        cache = {}
      } else {
        if (cache[id].type === 'timeout') {
          clearTimeout(id)
        } else {
          clearInterval(id)
        }
        delete cache[id]
      }
    }
  }
})
