/**
 * @Author likan
 * @Date 2022-06-23 09:40:55
 * @FilePath E:\TestSpace\@txzing\react-native\index.ts
 */

import setGlobalProps from 'react-native-props'
import Storage from './src/class/Storage'
import Toast from './src/components/Toast'
import useAsyncFocusCallbackEffect from './src/hooks/useAsyncFocusCallbackEffect'
import useForceUpdate from './src/hooks/useForceUpdate'
import useKeysState from './src/hooks/useKeysState'
import useRedux from './src/hooks/useRedux'
import theme from './src/class/Theme'

export {
  Storage,
  useAsyncFocusCallbackEffect,
  useForceUpdate,
  useKeysState,
  useRedux,
  Toast,
  setGlobalProps,
  theme
}
