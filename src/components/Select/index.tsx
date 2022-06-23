/**
 *
 * @Author likan
 * @Date 2022-05-18 14:59:30
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Modal from '../Modal'
import optionStyle from './style'

interface SelectItem {
  title: string
  onPress?: (index: number) => void
}

interface SelectProps {
  visible: boolean
  options: Array<SelectItem>
  onChannelPress?: (bool: boolean) => void
  onItemPress?: (data: SelectItem, index: number) => void
}

const Select = ({
  options,
  onChannelPress,
  onItemPress,
  visible
}: SelectProps) => {
  return (
    <Modal
      visible={visible}
      onOutsidePress={() => onChannelPress?.(false)}
      modalStyle={{ justifyContent: 'flex-end' }}
    >
      <View style={optionStyle.container}>
        <ScrollView style={optionStyle.scrollContainer}>
          {options.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                item.onPress?.(index)
                onItemPress?.(item, index)
              }}
              style={optionStyle.itemContainer}
              key={item.title}
            >
              <Text style={optionStyle.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={optionStyle.channelButton}
          onPress={() => onChannelPress?.(false)}
        >
          <Text style={optionStyle.itemTitle}>{'取消'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default Select
