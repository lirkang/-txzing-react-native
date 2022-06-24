/**
 * @Author likan
 * @Date 2022-06-23 16:43:29
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Alert\index.tsx
 */

import React, { forwardRef, useImperativeHandle } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { IconInfo, IconLoading, IconSuccess } from '../../assets'
import { Consumer } from '../../common/ThemeProvider'
import useKeysState from '../../hooks/useKeysState'
import Modal from '../Modal'

interface AlertProps {
  type?: 'success' | 'warning' | 'loading' | 'timeout' | 'default'
}

export interface AlertRef {
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
      setState({ title, visible: true, type })

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
    <Consumer>
      {theme => (
        <Modal
          visible={visible}
          modalStyle={{ justifyContent: 'center', alignItems: 'center' }}
          backgroundOpacity={0}
        >
          <View
            style={{
              backgroundColor: '#00000099',
              borderRadius: theme.borderRadius,
              width: Dimensions.get('window').width * 0.42,
              height: Dimensions.get('window').height * 0.2,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {getImage() && (
              <Image
                source={getImage()}
                style={{ transform: [{ scale: 0.9 }] }}
              />
            )}

            <View style={[{ height: 16 }]} />

            <Text
              numberOfLines={2}
              style={[
                {
                  color: '#ffffffcc',
                  fontSize: 16,
                  textAlign: 'center'
                }
              ]}
            >
              {title}
            </Text>
          </View>
        </Modal>
      )}
    </Consumer>
  )
})

export default Alert
