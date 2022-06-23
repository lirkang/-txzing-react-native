/**
 * @Author likan
 * @Date 2022-06-20 18:19:16
 * @FilePath E:\WorkSpace\txzeveryapp\src\common\hook\useRedux.ts
 */

import { useDispatch, useSelector } from 'react-redux'
import type { Dispatch } from 'redux'

/** 获取store和dispatch */
function useRedux<T = unknown>(): [T, Dispatch] {
  const store = useSelector<T, T>(store => store)
  const dispatch = useDispatch()

  return [store, dispatch]
}

export default useRedux
