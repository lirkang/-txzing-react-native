/**
 * @Author likan
 * @Date 2022-06-23 09:40:55
 * @FilePath E:\TestSpace\@txzing\react-native\index.ts
 */

import Button from './src/components/Button'
import CheckBox from './src/components/CheckBox'
import Dialog from './src/components/Dialog'
import Modal from './src/components/Modal'
import Options from './src/components/Options'
import PullToRefresh from './src/components/PullToRefresh'
import Select from './src/components/Select'
import SwipeList from './src/components/SwipeList'
import Switch from './src/components/Switch'
import Toast from './src/components/Toast'

export * from 'react-native-props'
export { default as setGlobalProps } from 'react-native-props'
export * from './src/common/Theme'
export * from './src/components/Button'
export * from './src/components/Dialog'
export * from './src/components/Modal'
export * from './src/components/Options'
export * from './src/components/PullToRefresh'
export * from './src/components/Select'
export * from './src/components/SwipeList'
export * from './src/components/Switch'
export * from './src/components/Toast'
export * from './src/hooks/useKeysState'
export { default as useKeysState } from './src/hooks/useKeysState'
export * from './src/hooks/useRedux'
export { default as useRedux } from './src/hooks/useRedux'
export {
  Button,
  Dialog,
  Modal,
  Options,
  PullToRefresh,
  Select,
  SwipeList,
  Switch,
  Toast,
  CheckBox
}

const Txzing = {
  Button,
  Dialog,
  Modal,
  Options,
  PullToRefresh,
  Select,
  SwipeList,
  Switch,
  Toast,
  CheckBox
}

export default Txzing
