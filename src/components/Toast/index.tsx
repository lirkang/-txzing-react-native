/**
 * @Author likan
 * @Date 2022-06-02 10:58:00
 * @FilePath E:\WorkSpace\txzeveryapp\src\component\base\Toast\index.tsx
 */

import { animated } from '@react-spring/native'
import React, { forwardRef, useContext, useImperativeHandle } from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Context } from '../../common/Theme'
import useKeysState from '../../hooks/useKeysState'

export type ToastRef = {
  show: (
    title: string | number | boolean,
    location?: 'top' | 'center' | 'bottom',
    duration?: number
  ) => void

  hide: () => void
}

interface ToastState {
  title: string
  location: 'top' | 'center' | 'bottom'
  visible: boolean
}

const Toast = forwardRef<ToastRef>((props, ref) => {
  const theme = useContext(Context)

  const [{ location, title, visible }, setState] = useKeysState<ToastState>({
    title: '',
    location: 'center',
    visible: false
  })

  let Timer: NodeJS.Timeout

  const AnimatedView = animated(View)

  function hide() {
    setState({ location: 'center', visible: false })

    clearTimeout(Timer)
  }

  useImperativeHandle(ref, () => ({
    show(title, location = 'center', duration = 3000) {
      setState({ title: title.toString(), location, visible: true })

      setTimeout(() => {
        hide()
      }, duration)
    },

    hide
  }))

  return (
    <AnimatedView
      pointerEvents={'none'}
      style={[
        StyleSheet.absoluteFill,
        toastStyle[location],
        { alignItems: 'center', display: visible ? 'flex' : 'none' }
      ]}
    >
      <Text
        numberOfLines={4}
        style={[
          {
            paddingVertical: 12,
            paddingHorizontal: 20,
            color: '#ffffffee',
            borderRadius: 2,
            backgroundColor: '#00000090',
            fontSize: 15,
            maxWidth: Dimensions.get('window').width * 0.7
          }
        ]}
      >
        {title}
      </Text>
    </AnimatedView>
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
