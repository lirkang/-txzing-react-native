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
  FlatList,
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
  cancelTitle?: string
}

const Select = ({
  options = [],
  onCancel,
  visible = false,
  cancelTitle = '取消'
}: SelectProps) => {
  const theme = useContext(Context)

  return (
    <Modal
      visible={visible}
      onCancel={() => onCancel?.(false)}
      style={{ justifyContent: 'flex-end' }}
    >
      <View
        style={{
          backgroundColor: theme.fill,
          borderTopRightRadius: theme.borderRadius,
          borderTopLeftRadius: theme.borderRadius,
          overflow: 'hidden'
        }}
      >
        <FlatList
          style={{ maxHeight: Dimensions.get('window').height * 0.4 }}
          data={options}
          renderItem={({ index, item: { title, onPress } }) => (
            <Item title={title} onPress={() => onPress?.(index)} />
          )}
        />

        <View style={{ height: 12, backgroundColor: theme.border }} />
        <Item title={cancelTitle} onPress={() => onCancel?.(false)} />
      </View>
    </Modal>
  )
}

const Item = ({ title, onPress }: SelectItem) => {
  const theme = useContext(Context)

  return (
    <TouchableHighlight
      underlayColor={theme.border}
      style={{
        paddingVertical: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: theme.border
      }}
      onPress={onPress}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: theme.primaryText
        }}
      >
        {title}
      </Text>
    </TouchableHighlight>
  )
}

Select.Item = Item

export default Select
