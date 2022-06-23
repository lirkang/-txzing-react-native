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
import { theme, useForceUpdate } from '../../..'
import Button from '../Button'
import Modal from '../Modal'

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

  const forceUpdate = useForceUpdate()

  theme.addListener(forceUpdate)

  return (
    <Modal
      modalStyle={{ justifyContent: 'flex-end', alignItems: 'center' }}
      visible={visible}
      onCannel={() => onOutsidePress?.(false)}
    >
      <View
        style={{
          backgroundColor: theme.getTheme.lightBackground,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          minHeight: Dimensions.get('window').height * 0.4,
          maxHeight: Dimensions.get('window').height * 0.4,
          width: Dimensions.get('window').width,
          padding: 12
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.getTheme.border,
            paddingBottom: 4
          }}
        >
          <Button
            title={'取消'}
            type={'text'}
            onPress={() => onOutsidePress?.(false)}
            titleStyle={{ fontSize: 14 }}
          />

          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>

          <Button
            title={'确定'}
            type={'text'}
            titleStyle={{ fontSize: 14 }}
            onPress={() => onConfirmPress?.(index)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            position: 'relative',
            height: Dimensions.get('window').height * 0.6
          }}
        >
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
                  style={{
                    height: Dimensions.get('window').height * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
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
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: '#eeeeee9f',
                height: 48,
                borderRadius: 12,
                top: Dimensions.get('window').height * 0.1 + 16
              }
            ]}
          />
        </View>
      </View>
    </Modal>
  )
}

export default Option
