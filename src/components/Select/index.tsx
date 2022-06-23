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
  TouchableHighlight,
  View
} from 'react-native'
import { Consumer } from '../../common/ThemeProvider'
import Modal from '../Modal'

interface SelectItem {
  title: string
  onPress?: (index: number) => void
}

interface SelectProps {
  visible?: boolean
  options?: Array<SelectItem>
  onChannel?: (bool: boolean) => void
  onPress?: (data: SelectItem, index: number) => void
}

const Select = ({
  options = [],
  onChannel,
  onPress,
  visible = false
}: SelectProps) => {
  return (
    <Consumer>
      {props => (
        <Modal
          visible={visible}
          onCannel={() => onChannel?.(false)}
          modalStyle={{ justifyContent: 'flex-end' }}
        >
          <View
            style={{
              backgroundColor: '#ffffff',
              borderTopRightRadius: props.borderRadius,
              borderTopLeftRadius: props.borderRadius,
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
                <TouchableHighlight
                  underlayColor={props.background}
                  onPress={() => {
                    item.onPress?.(index)
                    onPress?.(item, index)
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
                </TouchableHighlight>
              ))}
            </ScrollView>

            <TouchableHighlight
              underlayColor={props.background}
              style={{ paddingVertical: 16 }}
              onPress={() => onChannel?.(false)}
            >
              <Text style={{ textAlign: 'center', fontSize: 16 }}>
                {'取消'}
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
      )}
    </Consumer>
  )
}

export default Select
