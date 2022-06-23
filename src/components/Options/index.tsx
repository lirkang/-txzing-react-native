/**
 *
 * @Author likan
 * @Date 2022-05-19 14:15:16
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React, { useState } from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { theme } from '../../..'
import Button from '../Button'
import Modal from '../Modal'
import selectStyle from './style'

interface SelectProps {
  title?: string
  visible?: boolean
  options: Array<{
    label?: string
    datalist: Array<{
      title?: string
    }>
  }>
  onOutsidePress?: (bool: boolean) => void
  onConfirmPress?: (index: number) => void
}

const Option = ({
  options = [],
  title,
  visible = false,
  onOutsidePress,
  onConfirmPress
}: SelectProps) => {
  const [index, setIndex] = useState(0)

  return (
    <Modal
      modalStyle={selectStyle.modalStyle}
      visible={visible}
      onCannel={() => onOutsidePress?.(false)}
    >
      <View style={selectStyle.container}>
        <View style={selectStyle.headerContainer}>
          <Button
            title={'取消'}
            type={'text'}
            onPress={() => onOutsidePress?.(false)}
            titleStyle={{ fontSize: 14 }}
          />

          <Text style={selectStyle.title}>{title}</Text>

          <Button
            title={'确定'}
            type={'text'}
            titleStyle={{ fontSize: 14 }}
            onPress={() => onConfirmPress?.(index)}
          />
        </View>

        <View style={selectStyle.selectContainer}>
          {options.map(({ datalist, label }) => (
            <FlatList
              key={label}
              scrollEventThrottle={100}
              onScroll={e => {
                let index = Math.trunc(
                  datalist.length *
                    (Math.trunc(e.nativeEvent.contentOffset.y) /
                      Math.trunc(
                        e.nativeEvent.layoutMeasurement.height -
                          Dimensions.get('window').height * 0.4
                      ))
                )

                if (index === datalist.length) {
                  index--
                }

                setIndex(index)
              }}
              data={datalist}
              ListHeaderComponent={
                <View
                  style={{ height: Dimensions.get('window').height * 0.1 }}
                />
              }
              ListFooterComponent={
                <View
                  style={{ height: Dimensions.get('window').height * 0.4 }}
                />
              }
              renderItem={({ item, index: currentIndex }) => (
                <TouchableOpacity
                  activeOpacity={1}
                  style={selectStyle.selectTitle}
                >
                  <Text
                    style={{
                      fontSize: index === currentIndex ? 20 : 16,
                      color:
                        index === currentIndex
                          ? theme.getTheme.accent
                          : theme.getTheme.regularText
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ))}

          <View
            pointerEvents={'none'}
            style={[StyleSheet.absoluteFill, selectStyle.bottomHeight]}
          />
        </View>
      </View>
    </Modal>
  )
}

export default Option
