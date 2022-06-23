/**
 * @Author likan
 * @Date 2022-06-23 09:40:55
 * @FilePath E:\TestSpace\@txzing\react-native\index.ts
 */

import setGlobalProps from 'react-native-props'
import Storage from './src/common/Storage'
import { createTheme, defaultTheme } from './src/common/Theme'
import { ThemeProvider } from './src/common/ThemeProvider'
import Button from './src/components/Button'
import Dialog from './src/components/Dialog'
import Modal from './src/components/Modal'
import Options from './src/components/Options'
import Select from './src/components/Select'
import Toast from './src/components/Toast'
import useAsyncFocusCallbackEffect from './src/hooks/useAsyncFocusCallbackEffect'
import useForceUpdate from './src/hooks/useForceUpdate'
import useKeysState from './src/hooks/useKeysState'
import useRedux from './src/hooks/useRedux'

setGlobalProps('ScrollView', {
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false
})('Text', {
  allowFontScaling: false,
  numberOfLines: 1
})('TextInput', {
  allowFontScaling: false,
  numberOfLines: 1,
  style: [{ paddingVertical: 0 }]
})('Image', {
  resizeMode: 'cover'
})('TouchableOpacity', {
  activeOpacity: 0.6
})

export {
  Storage,
  useAsyncFocusCallbackEffect,
  useForceUpdate,
  useKeysState,
  useRedux,
  Toast,
  Button,
  Modal,
  Options,
  Select,
  setGlobalProps,
  ThemeProvider,
  defaultTheme,
  createTheme,
  Dialog
}
