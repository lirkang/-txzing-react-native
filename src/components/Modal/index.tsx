/* eslint-disable react/prop-types */

/**
 *
 * @Author likan
 * @Date 2022-05-18 14:26:46
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React, { useContext } from 'react'
import {
  Modal as RNModal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import { Context } from '../../common/Theme'

export interface ModalProps {
  visible?: boolean
  children?: JSX.Element | Array<JSX.Element>
  modalStyle?: StyleProp<ViewStyle>
  onCancel?: (bool: false) => void
  backgroundOpacity?: number
  dark?: boolean
  cancelable?: boolean
  onShow?: (...args: any) => void
  closeOnBack?: boolean
  animationType?: 'none' | 'fade' | 'slide'
}

const Modal = ({
  visible,
  children,
  modalStyle,
  onCancel,
  onShow,
  backgroundOpacity = 100,
  dark = true,
  cancelable = true,
  closeOnBack = true,
  animationType = 'fade'
}: ModalProps) => {
  const theme = useContext(Context)

  const backgroundColor =
    (dark ? '#000000' : '#ffffff') + backgroundOpacity.toString(16)

  return (
    <RNModal
      pointerEvents={'none'}
      onRequestClose={() => closeOnBack && onCancel?.(false)}
      visible={visible}
      animationType={animationType}
      hardwareAccelerated
      transparent
      statusBarTranslucent
      onShow={onShow}
    >
      <TouchableOpacity
        onPress={() => cancelable && onCancel?.(false)}
        activeOpacity={1}
        style={[{ backgroundColor }, StyleSheet.absoluteFill, modalStyle]}
      >
        <TouchableOpacity activeOpacity={1}>{children}</TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  )
}

export default Modal
