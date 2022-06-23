/**
 * @Author likan
 * @Date 2022-06-23 16:43:29
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Alert\index.tsx
 */

import React, { forwardRef, useImperativeHandle } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IconInfo, IconLoading, IconSuccess } from '../../assets'
import useKeysState from '../../hooks/useKeysState'
import Modal from '../Modal'

interface AlertProps {
  type?: 'success' | 'warning' | 'loading' | 'timeout' | 'default'
}

interface AlertRef {
  showAlert: (
    type: AlertProps['type'],
    title: string,
    duration?: number
  ) => void
  hideAlert: () => void
}

const Alert = forwardRef<AlertRef>((props, ref) => {
  const [{ title, visible, type }, setState] = useKeysState<{
    title: string
    visible: boolean
    type: AlertProps['type']
  }>({
    title: '',
    visible: false,
    type: 'default'
  })

  let timer: NodeJS.Timeout

  useImperativeHandle(ref, () => ({
    showAlert(type, title, duration) {
      setState({ title, visible, type })

      if (duration) {
        timer = setTimeout(() => {
          setState({ title: '', visible: false, type: 'default' })

          clearTimeout(timer)
        }, duration)
      }
    },

    hideAlert() {
      clearTimeout(timer)

      setState({ title: '', visible: false, type: 'default' })
    }
  }))

  function getImage() {
    if (type === 'loading' || type === 'timeout') {
      return IconLoading
    } else if (type === 'success') {
      return IconSuccess
    } else if (type === 'warning') {
      return IconInfo
    } else if (type === 'default') {
      return false
    }
  }

  return (
    <Modal
      visible={visible}
      modalStyle={{ justifyContent: 'center', alignItems: 'center' }}
      backgroundOpacity={50}
    >
      <View
        style={{
          transform: [{ scale: 1.2 }],
          backgroundColor: '#000000aa',
          padding: 36,
          borderRadius: 4,
          paddingBottom: 40
        }}
      >
        {getImage() && <Image source={getImage()} />}

        <Text
          style={[
            StyleSheet.absoluteFill,
            {
              color: '#ffffffcc',
              bottom: 4,
              top: undefined,
              fontSize: 16,
              textAlign: 'center'
            }
          ]}
        >
          {title}
        </Text>
      </View>
    </Modal>
  )
})

export default Alert
