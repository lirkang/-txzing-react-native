/* eslint-disable react/prop-types */

/**
 *
 * @Author likan
 * @Date 2022-05-18 14:26:46
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React, { Fragment } from 'react'
import {
  Modal as RNModal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from 'react-native'

export interface ModalProps {
  visible?: boolean
  children?: JSX.Element | Array<JSX.Element>
  style?: StyleProp<ViewStyle>
  onCancel?: (bool: false) => void
  backgroundOpacity?: number
  dark?: boolean
  mode?: 'modal' | 'view'
}

const Modal = ({
  visible,
  children,
  style = {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999
  },
  onCancel,
  backgroundOpacity = 100,
  dark = true,
  mode = 'modal'
}: ModalProps) => {
  const backgroundColor =
    (dark ? '#000000' : '#ffffff') + backgroundOpacity.toString(16)

  const Container = () => (
    <TouchableOpacity
      onPress={() => onCancel?.(false)}
      activeOpacity={1}
      style={[{ backgroundColor }, StyleSheet.absoluteFill, style]}
    >
      <TouchableOpacity activeOpacity={1}>{children}</TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <Fragment>
      {mode === 'modal' ? (
        <RNModal
          pointerEvents={'none'}
          // onRequestClose={() => onCancel?.(false)}
          visible={visible}
          animationType={'fade'}
          hardwareAccelerated
          transparent
          statusBarTranslucent
        >
          <Container />
        </RNModal>
      ) : (
        <Fragment>{visible && <Container />}</Fragment>
      )}
    </Fragment>
  )
}

export default Modal
