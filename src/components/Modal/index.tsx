/* eslint-disable react/prop-types */

/**
 *
 * @Author likan
 * @Date 2022-05-18 14:26:46
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import { animated, useSpring } from '@react-spring/native'
import React from 'react'
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

interface ModalProps {
  visible?: boolean
  children?: JSX.Element | Array<JSX.Element>
  modalStyle?: ViewStyle
  onOutsidePress?: (bool: false) => void
  animationType?: 'fade' | 'none' | 'slide'
  backgroundOpacity?: number
  dark?: boolean
  cancelable?: boolean
  hasToast?: boolean
}

const Modal = ({
  visible,
  children,
  modalStyle,
  onOutsidePress,
  backgroundOpacity = 100,
  dark = true,
  cancelable = true
}: ModalProps) => {
  const backgroundColor =
    (dark ? '#000000' : '#ffffff') + backgroundOpacity.toString(16)

  const AnimatedView = animated(View)

  return (
    <RNModal
      pointerEvents={'none'}
      onRequestClose={() => onOutsidePress?.(false)}
      visible={visible}
      animationType={'none'}
      hardwareAccelerated
      transparent
      statusBarTranslucent
    >
      <AnimatedView
        style={[
          { flex: 1 },
          useSpring({
            from: { opacity: Number(!visible) },
            to: { opacity: Number(visible) }
          })
        ]}
      >
        <TouchableOpacity
          onPress={() => cancelable && onOutsidePress?.(false)}
          activeOpacity={1}
          style={[{ backgroundColor }, StyleSheet.absoluteFill, modalStyle]}
        >
          <TouchableOpacity activeOpacity={1}>{children}</TouchableOpacity>
        </TouchableOpacity>
      </AnimatedView>
    </RNModal>
  )
}

export default Modal
