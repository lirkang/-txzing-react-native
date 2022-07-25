/**
 * @Author likan
 * @Date 2022-06-23 14:13:53
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Dialog\index.tsx
 */

import React, { createRef, Fragment, useContext, useState } from 'react'
import {
  ColorValue,
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableHighlight,
  View
} from 'react-native'
import { Context } from '../../common/Theme'
import Modal from '../Modal'

export interface DialogProps {
  description?: string
  onCancel?: (bool: boolean) => void
  onConfirm?: (...args: any) => void
  visible?: boolean
  confirmTitle?: string
  cancelTitle?: string
  autoCloseOnConfirm?: boolean
  singleButton?: boolean
  containInput?: boolean
  textInputProps?: TextInputProps
  title?: string
  clearImageSource?: ImageSourcePropType
  cancelable?: boolean
}

interface ButtonProps {
  onPress?: () => void
  title?: string
  underlayColor?: ColorValue
  textColor?: ColorValue
}

const Dialog = ({
  description = '',
  onCancel,
  onConfirm,
  visible = false,
  confirmTitle = '确定',
  cancelTitle = '取消',
  autoCloseOnConfirm = true,
  singleButton = false,
  containInput = false,
  textInputProps = {},
  title,
  clearImageSource,
  cancelable = true
}: DialogProps) => {
  const theme = useContext(Context)
  const InputRef = createRef<TextInput>()

  const [error_text, setError_text] = useState('')
  const [value, setValue] = useState('')

  function Button({ onPress, title, textColor, underlayColor }: ButtonProps) {
    return (
      <TouchableHighlight
        underlayColor={underlayColor}
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

  const newLocal = () => {
    console.log(InputRef.current?.state)
    onConfirm?.(value, setError_text)

    autoCloseOnConfirm && onCancel?.(false)
  }

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      cancelable={cancelable}
      modalStyle={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <View
        style={{
          backgroundColor: theme.background,
          borderRadius: theme.borderRadius,
          overflow: 'hidden',
          width: Dimensions.get('window').width * 0.8,
          height: Dimensions.get('window').height * 0.2
        }}
      >
        <View
          style={{
            height: '65%',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.border,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background
          }}
        >
          {containInput ? (
            <View
              style={[
                {
                  paddingHorizontal: 24,
                  width: '100%',
                  alignItems: 'center',
                  marginBottom: 12
                }
              ]}
            >
              <Text
                style={[
                  {
                    fontWeight: '500',
                    paddingBottom: 12,
                    fontSize: 16,
                    color: theme.primaryText
                  }
                ]}
              >
                {title}
              </Text>

              <View
                style={[
                  {
                    position: 'relative',
                    width: '100%',
                    justifyContent: 'center'
                  }
                ]}
              >
                <TextInput
                  ref={InputRef}
                  value={value}
                  {...textInputProps}
                  onChangeText={v => {
                    textInputProps.onChangeText?.(v)
                    setValue(v)
                  }}
                  style={[
                    {
                      borderRadius: theme.borderRadius,
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: theme.accent,
                      width: '100%',
                      paddingVertical: 6
                    },
                    textInputProps.style
                  ]}
                />

                {Boolean(clearImageSource && value.length) && (
                  <Image
                    style={[{ position: 'absolute', right: 12 }]}
                    source={clearImageSource!}
                  />
                )}
              </View>

              {Boolean(error_text) && (
                <Text
                  numberOfLines={2}
                  style={[
                    {
                      position: 'absolute',
                      color: theme.error,
                      right: 20,
                      bottom: -16,
                      fontSize: 12
                    }
                  ]}
                >
                  {error_text}
                </Text>
              )}
            </View>
          ) : (
            <Text
              numberOfLines={2}
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                color: theme.primaryText
              }}
            >
              {description}
            </Text>
          )}
        </View>

        <View
          style={{
            height: '35%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.border
          }}
        >
          {singleButton ? (
            <Button
              title={confirmTitle}
              underlayColor={theme.fill}
              textColor={theme.accent}
              onPress={newLocal}
            />
          ) : (
            <Fragment>
              <Button
                title={cancelTitle}
                textColor={theme.primaryText}
                underlayColor={theme.fill}
                onPress={() => onCancel?.(false)}
              />

              <View style={{ width: StyleSheet.hairlineWidth }} />

              <Button
                title={confirmTitle}
                textColor={theme.accent}
                underlayColor={theme.fill}
                onPress={newLocal}
              />
            </Fragment>
          )}
        </View>
      </View>
    </Modal>
  )
}

export default Dialog
