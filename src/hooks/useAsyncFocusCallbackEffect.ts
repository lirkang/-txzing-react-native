/**
 * @Author likan
 * @Date 2022-06-23 09:43:18
 * @FilePath E:\TestSpace\@txzing\react-native\hooks\useAsyncFocusCallbackEffect.ts
 */

import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

/**
 * 在页面进入时触发 (react-native only)
 * @param fn 触发时调用的函数
 * @param deps 额外的依赖项
 * @param returnFn 离开页面调用的函数
 */
function useAsyncFocusCallbackEffect(
  fn: () => void,
  deps?: Array<unknown>,
  returnFn?: () => void
) {
  useFocusEffect(
    useCallback(() => {
      fn()

      return returnFn
    }, deps ?? [])
  )
}

export default useAsyncFocusCallbackEffect
