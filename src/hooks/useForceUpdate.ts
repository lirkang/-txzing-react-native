/**
 * @Author likan
 * @Date 2022-06-21 10:46:27
 * @FilePath E:\WorkSpace\txzeveryapp\src\common\hook\useForceUpdate.ts
 */

import { useState } from 'react'

/** 返回一个强制重新渲染页面的函数 */
function useForceUpdate() {
  const [date, setDate] = useState(Date.now())

  return () => {
    setDate(Date.now())
  }
}

export default useForceUpdate
