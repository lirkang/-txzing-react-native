/**
 * @Author likan
 * @Date 2022-06-21 15:57:02
 * @FilePath E:\WorkSpace\txzeveryapp\src\common\hook\useKeysState.ts
 */

import { useState } from 'react'

type SetState<State = unknown> = (
  newState: Partial<State>,
  callback?: (state: State) => void
) => void

type UseKeysState = <State = unknown>(
  initialState: State
) => [State, SetState<State>]

/**
 * 可以只修改state中某个key的值, 仅支持Object类型的数据
 * @param initialState 初始值
 * @returns
 */
const useKeysState: UseKeysState = initialState => {
  if (Object.prototype.toString.call(initialState) !== '[object Object]') {
    const err = new Error('只能传入Object类型的数据')

    console.error(err)

    throw err
  } else {
    const [state, originSetState] = useState(initialState)

    const setState: SetState<typeof initialState> = (newState, callback) => {
      let callbackState = state

      originSetState(preState => {
        callbackState = { ...preState, ...newState }

        return callbackState
      })

      callback?.(callbackState)
    }

    return [state, setState]
  }
}

export default useKeysState
