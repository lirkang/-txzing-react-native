/**
 *
 * @Author likan
 * @Date 2022-05-19 14:15:16
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// @ts-ignore
import { ParallelPicker } from 'react-native-slidepicker'
import { Consumer } from '../../common/ThemeProvider'
import Button from '../Button'
import Modal from '../Modal'

interface SelectProps {
  title?: string
  visible?: boolean
  options?: Array<Array<{ name?: string }>>
  onCannel?: (bool: boolean) => void
  onConfirm?: (index: number) => void
}

const Options = ({
  options = [],
  title,
  visible = false,
  onCannel,
  onConfirm
}: SelectProps) => {
  return (
    <Consumer>
      {theme => (
        <Modal
          visible={visible}
          modalStyle={{ justifyContent: 'flex-end' }}
          onCancel={onCannel}
        >
          <ParallelPicker
            pickerStyle={{
              activeBgColor: theme.background,
              activeFontColor: theme.accent,
              activeFontSize: 18,
              normalBgColor: theme.lightBackground,
              normalFontColor: theme.regularText,
              normalFontSize: 16,
              normalBgOpacity: 1,
              visibleNum: 3,
              itemHeight: 64
            }}
            dataSource={options}
            customHead={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: theme.lightBackground,
                  height: 64,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: theme.border,
                  borderTopLeftRadius: theme.borderRadius,
                  borderTopRightRadius: theme.borderRadius
                }}
              >
                <Button
                  type={'text'}
                  title={'取消'}
                  onPress={() => onCannel?.(false)}
                />

                <Text style={{ fontSize: 18, fontWeight: '500' }}>{title}</Text>

                <Button
                  type={'text'}
                  title={'确定'}
                  onPress={() => onConfirm?.()}
                />
              </View>
            }
          />
        </Modal>
      )}
    </Consumer>
  )
}

export default Options
