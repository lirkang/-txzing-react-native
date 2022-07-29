/**
 * @Author likan
 * @Date 2022-06-23 14:13:53
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Dialog\index.tsx
 */

import React, { Fragment, useContext } from 'react'
import {
  ColorValue,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Context } from '../../common/Theme'
import Modal from '../Modal'

export interface DialogButtonArray {
  title?: string
  primary?: boolean
  onPress?: () => void
}

export interface DialogProps {
  visible?: boolean
  title?: string
  children?: JSX.Element | Array<JSX.Element>
  buttons?: Array<DialogButtonArray>
}

interface ButtonProps {
  onPress?: () => void
  title?: string
  textColor?: ColorValue
}

const defaultButtons = [{ title: '取消' }, { title: '确定', primary: true }]

const Dialog = ({
  visible = false,
  title,
  children = <></>,
  buttons = defaultButtons
}: DialogProps) => {
  const theme = useContext(Context)

  function Button({ onPress, title, textColor }: ButtonProps) {
    return (
      <TouchableHighlight
        underlayColor={theme.border}
        onPress={onPress}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: theme.background
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            color: textColor
          }}
        >
          {title}
        </Text>
      </TouchableHighlight>
    )
  }

  return (
    <Modal visible={visible} backgroundOpacity={155}>
      <View
        style={{
          backgroundColor: theme.background,
          borderRadius: theme.borderRadius * 2,
          overflow: 'hidden',
          width: Dimensions.get('window').width * 0.8
        }}
      >
        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.border,
            backgroundColor: theme.background
          }}
        >
          {Boolean(title) && (
            <Text
              style={[
                {
                  color: theme.primaryText,
                  fontWeight: '500',
                  textAlign: 'center',
                  fontSize: 16,
                  paddingVertical: 12
                }
              ]}
            >
              {title}
            </Text>
          )}

          {children}
        </View>

        <View
          style={{
            flexDirection: 'row',
            maxHeight: Dimensions.get('window').height * 0.1,
            backgroundColor: theme.border
          }}
        >
          {buttons.map(({ onPress, primary, title }, index) => (
            <Fragment>
              <Button
                key={title}
                onPress={onPress}
                textColor={primary ? theme.accent : theme.primaryText}
                title={title}
              />

              {index <= buttons.length && (
                <View style={[{ width: StyleSheet.hairlineWidth }]} />
              )}
            </Fragment>
          ))}
        </View>
      </View>
    </Modal>
  )
}

export default Dialog
