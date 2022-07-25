/**
 *
 * @Author likan
 * @Date 2022-05-18 14:59:30
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React, { useContext } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import { Context } from '../../common/Theme'
import Modal from '../Modal'

export interface SelectItem {
  title: string
  onPress?: (index: number) => void
}

export interface SelectProps {
  visible?: boolean
  options?: Array<SelectItem>
  onCancel?: (bool: boolean) => void
  onPress?: (data: SelectItem, index: number) => void
  cancelTitle?: string
}

const Select = ({
  options = [],
  onCancel,
  onPress,
  visible = false,
  cancelTitle = '取消'
}: SelectProps) => {
  const theme = useContext(Context)

  return (
    <Modal
      visible={visible}
      onCancel={() => onCancel?.(false)}
      modalStyle={{ justifyContent: 'flex-end' }}
    >
      <View
        style={{
          backgroundColor: theme.fill,
          borderTopRightRadius: theme.borderRadius,
          borderTopLeftRadius: theme.borderRadius,
          overflow: 'hidden'
        }}
      >
        <ScrollView
          style={{
            maxHeight: Dimensions.get('window').height * 0.4,
            borderBottomColor: theme.border,
            borderBottomWidth: 6
          }}
        >
          {options.map((item, index) => (
            <TouchableHighlight
              underlayColor={theme.background}
              onPress={() => {
                item.onPress?.(index)
                onPress?.(item, index)
              }}
              style={{
                paddingVertical: 20,
                borderBottomColor: theme.border,
                borderBottomWidth: StyleSheet.hairlineWidth
              }}
              key={item.title}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: theme.primaryText
                }}
              >
                {item.title}
              </Text>
            </TouchableHighlight>
          ))}
        </ScrollView>

        <TouchableHighlight
          underlayColor={theme.background}
          style={{ paddingVertical: 16 }}
          onPress={() => onCancel?.(false)}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: theme.primaryText
            }}
          >
            {cancelTitle}
          </Text>
        </TouchableHighlight>
      </View>
    </Modal>
  )
}

export default Select
