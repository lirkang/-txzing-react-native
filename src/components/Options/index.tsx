/**
 *
 * @Author likan
 * @Date 2022-05-19 14:15:16
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React, { createRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// @ts-ignore
import { ParallelPicker } from 'react-native-slidepicker'
import { Consumer } from '../../common/ThemeProvider'
import Button from '../Button'
import Modal from '../Modal'

type Option = { name: string; id: string | number }

interface OptionsProps {
  title?: string
  visible?: boolean
  options?: Array<Array<Option>>
  autoClose?: boolean
  onCancel?: (bool: boolean) => void
  onConfirm?: (data: Array<Array<Option>>) => void
  onChange?: (data: Array<Array<Option>>) => void
  value?: Array<Array<Pick<Option, 'id'>>>
  type?: ''
}

const Options = ({
  options = [],
  title = '选择',
  visible = false,
  onCancel,
  onConfirm,
  autoClose = false,
  onChange,
  value
}: OptionsProps) => {
  const SelectRef = createRef<any>()

  return (
    <Consumer>
      {theme => (
        <Modal
          visible={visible}
          modalStyle={{ justifyContent: 'flex-end' }}
          onCancel={onCancel}
        >
          <ParallelPicker
            ref={SelectRef}
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
            value={value}
            onceChange={onChange}
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
                  borderTopLeftRadius: theme.borderRadius * 2,
                  borderTopRightRadius: theme.borderRadius * 2
                }}
              >
                <Button
                  type={'text'}
                  title={'取消'}
                  onPress={() => onCancel?.(false)}
                />

                <Text style={{ fontSize: 18, fontWeight: '500' }}>{title}</Text>

                <Button
                  type={'text'}
                  title={'确定'}
                  onPress={() => {
                    onConfirm?.(SelectRef.current.resultArray)

                    autoClose && onCancel?.(false)
                  }}
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
