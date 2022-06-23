/**
 * @Author likan
 * @Date 2022-06-23 14:13:53
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Dialog\index.tsx
 */

import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Consumer } from '../../common/ThemeProvider'
import Modal from '../Modal'

interface DialogProps {
  description?: string
  onCancel?: (bool: boolean) => void
  onConfirm?: () => void
  visible?: boolean
  confirmTitle?: string
  cancelTitle?: string
  autoCloseOnConfirm?: boolean
}

const Dialog = ({
  description = '',
  onCancel = () => {},
  onConfirm = () => {},
  visible = false,
  confirmTitle = '确定',
  cancelTitle = '取消',
  autoCloseOnConfirm = true
}: DialogProps) => {
  return (
    <Consumer>
      {props => (
        <Modal
          visible={visible}
          onCannel={onCancel}
          modalStyle={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: props.lightBackground,
              borderRadius: props.borderRadius,
              overflow: 'hidden',
              width: Dimensions.get('window').width * 0.8,
              height: Dimensions.get('window').height * 0.2
            }}
          >
            <View
              style={{
                height: '65%',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: props.border,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                numberOfLines={2}
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >
                {description}
              </Text>
            </View>

            <View
              style={{
                height: '35%',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <TouchableHighlight
                underlayColor={props.background}
                onPress={() => onCancel(false)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 16
                  }}
                >
                  {cancelTitle}
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                underlayColor={props.background}
                onPress={() => {
                  onConfirm()

                  if (autoCloseOnConfirm) {
                    onCancel(false)
                  }
                }}
                style={[
                  {
                    borderLeftColor: props.border,
                    borderLeftWidth: StyleSheet.hairlineWidth,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }
                ]}
              >
                <Text
                  style={[
                    {
                      color: props.accent,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 16
                    }
                  ]}
                >
                  {confirmTitle}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      )}
    </Consumer>
  )
}

export default Dialog
