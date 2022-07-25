/**
 * @Author likan
 * @Date 2022-07-23 10:21:05
 * @FilePath E:\TestSpace\@txzing\react-native\src\common\model.ts
 */

import { type Dispatch, type SetStateAction } from 'react'

function autoUpdateState<
  T extends Record<keyof any, any> = any,
  E extends keyof T = keyof T,
  S extends any = any
>(getEvent: {
  key: keyof T
  eventName: E
  keyName?: Array<string>
  state: S
  setState: Dispatch<SetStateAction<S>>
}) {
  const { key, keyName, eventName, setState, state } = getEvent

  return {
    [key]: state,
    [eventName](e: any) {
      let o = e

      if (Array.isArray(keyName) && keyName.length) {
        keyName.forEach(key => {
          o = e[key]
        })
      }

      setState(o)
    }
  }
}

export default autoUpdateState
