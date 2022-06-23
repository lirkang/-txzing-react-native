/**
 * @Author likan
 * @Date 2022-06-02 10:58:00
 * @FilePath E:\WorkSpace\txzeveryapp\src\component\base\Toast\index.tsx
 */

import { animated, useSpring } from '@react-spring/native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Consumer } from '../../common/ThemeProvider'

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
    <Consumer>
      {props => (
        <AnimatedView
          pointerEvents={'none'}
          style={[
            StyleSheet.absoluteFill,
            toastStyle[location],
            { alignItems: 'center' },
            useSpring({
              from: { opacity: toastVisible ? 0 : 1 },
              to: { opacity: toastVisible ? 1 : 0 }
            })
          ]}
        >
          <Text
            style={[
              {
                paddingVertical: title ? 12 : 0,
                paddingHorizontal: title ? 20 : 0,
                color: '#ffffffee',
                borderRadius: props.borderRadius,
                backgroundColor: '#00000090',
                fontSize: 15
              }
            ]}
          >
            {title}
          </Text>
        </AnimatedView>
      )}
    </Consumer>
  )
})

export default Toast

const toastStyle = StyleSheet.create({
  top: {
    justifyContent: 'flex-start',
    top: (StatusBar.currentHeight || 0) * 3
  },

  center: {
    justifyContent: 'center'
  },

  bottom: {
    justifyContent: 'flex-end',
    bottom: (StatusBar.currentHeight || 0) * 4
  }
})
