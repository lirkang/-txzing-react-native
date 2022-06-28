/**
 * @Author likan
 * @Date 2022-06-23 09:40:55
 * @FilePath E:\TestSpace\@txzing\react-native\index.ts
 */

import setGlobalProps from 'react-native-props'
import setProps from './src/common/SetProps'
import Storage from './src/common/Storage'
import defaultTheme from './src/common/Theme'
import ThemeProvider from './src/common/ThemeProvider'
import Alert from './src/components/Alert'
import Button from './src/components/Button'
import Dialog from './src/components/Dialog'
import Modal from './src/components/Modal'
import Options from './src/components/Options'
import Select from './src/components/Select'
import Slider from './src/components/Slider'
import Switch from './src/components/Switch'
import Toast from './src/components/Toast'
import useAsyncFocusCallbackEffect from './src/hooks/useAsyncFocusCallbackEffect'
import useForceUpdate from './src/hooks/useForceUpdate'
import useKeysState from './src/hooks/useKeysState'
import useRedux from './src/hooks/useRedux'

setProps(defaultTheme)

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
  Dialog,
  Switch,
  Slider,
  Alert
}
