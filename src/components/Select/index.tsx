/**
 *
 * @Author likan
 * @Date 2022-05-18 14:59:30
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Modal from '../Modal'
import { Consumer } from '../../common/ThemeProvider'

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
    <Consumer>
      {props => (
        <Modal
          visible={visible}
          onCannel={() => onChannelPress?.(false)}
          modalStyle={{ justifyContent: 'flex-end' }}
        >
          <View
            style={{
              backgroundColor: '#ffffff',
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              overflow: 'hidden',
              paddingBottom: 24
            }}
          >
            <ScrollView
              style={{
                maxHeight: Dimensions.get('window').height * 0.4,
                borderBottomColor: '#f6f6f7',
                borderBottomWidth: 6
              }}
            >
              {options.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    item.onPress?.(index)
                    onItemPress?.(item, index)
                  }}
                  style={{
                    paddingVertical: 20,
                    borderBottomColor: props.border,
                    borderBottomWidth: StyleSheet.hairlineWidth
                  }}
                  key={item.title}
                >
                  <Text style={{ textAlign: 'center', fontSize: 16 }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={{
                paddingVertical: 16
              }}
              onPress={() => onChannelPress?.(false)}
            >
              <Text style={{ textAlign: 'center', fontSize: 16 }}>
                {'取消'}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </Consumer>
  )
}

export default Select
