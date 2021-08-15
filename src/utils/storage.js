/***
 * 本地存储封装模块
 *
 *
 * **/

export  const getItem = name => {
  //return window.localStorage.getItem(name)
  const data = window.localStorage.getItem(name)
  //为什么把JSON.parse放到try-catch
  //因为data可能不是JSON格式字符串
  try {
    //尝试把data转为js对象
    return JSON.parse(data)
  } catch (err) {
    return data
  }

}

export  const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.locationbar.setItem(name, value)
}


export  const removeItem = name => {
  window.localStorage.removeItem(name)
}
