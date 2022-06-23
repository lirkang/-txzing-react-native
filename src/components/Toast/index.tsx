/**
 * @Author likan
 * @Date 2022-06-02 10:58:00
 * @FilePath E:\WorkSpace\txzeveryapp\src\component\base\Toast\index.tsx
 */

import { animated, useSpring } from '@react-spring/native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import toastStyle from './style'

type ToastRef = {
  showToast?: (
    title: string,
    location?: 'top' | 'center' | 'bottom',
    duration?: number
  ) => void
  hideToast?: () => void
  title?: string
}

const Toast = forwardRef<ToastRef>((props, ref) => {
  const [toastVisible, setToastVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState<'top' | 'center' | 'bottom'>(
    'center'
  )
  const AnimatedView = animated(View)

  let timer: NodeJS.Timeout

  useImperativeHandle(ref, () => ({
    showToast(title, location, duration) {
      setTitle(title)
      setToastVisible(true)
      setLocation(location ?? 'center')

      if (duration) {
        setTimeout(() => {
          setToastVisible(false)
          clearTimeout(timer)
        }, duration)
      }
    },

    hideToast() {
      setToastVisible(false)
      clearTimeout(timer)
    },
    title
  }))

  return (
    <AnimatedView
      pointerEvents={'none'}
      style={[
        StyleSheet.absoluteFill,
        toastStyle.container,
        toastStyle[location],
        useSpring({
          from: { opacity: toastVisible ? 0 : 1 },
          to: { opacity: toastVisible ? 1 : 0 }
        })
      ]}
    >
      <Text
        style={[
          toastStyle.title,
          { paddingVertical: title ? 12 : 0, paddingHorizontal: title ? 20 : 0 }
        ]}
      >
        {title}
      </Text>
    </AnimatedView>
  )
})

export default Toast
