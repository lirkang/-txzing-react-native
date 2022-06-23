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
import { Theme } from '../../common/Theme'
import { Consumer } from '../../common/ThemeProvider'
import Button from '../Button'
import Modal from '../Modal'

interface SelectProps {
  title?: string
  visible?: boolean
  options?: Array<Array<{ title?: string }>>
  onCannel?: (bool: boolean) => void
  onConfirm?: (index: number) => void
}

const Option = ({
  data,
  theme
}: {
  data: Array<{ title?: string }>
  theme: Theme
}) => {
  const [index, setIndex] = useState(0)

  return (
    <FlatList
      scrollEventThrottle={100}
      onScroll={e => {
        let index = Math.trunc(
          data.length *
            (Math.trunc(e.nativeEvent.contentOffset.y) /
              Math.trunc(
                e.nativeEvent.layoutMeasurement.height -
                  Dimensions.get('window').height * 0.4
              ))
        )

        if (index === data.length) {
          index--
        }

        setIndex(index)
      }}
      data={data}
      ListHeaderComponent={
        <View style={{ height: Dimensions.get('window').height * 0.1 }} />
      }
      ListFooterComponent={
        <View style={{ height: Dimensions.get('window').height * 0.4 }} />
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
              color: index === currentIndex ? theme.accent : theme.regularText
            }}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
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
          modalStyle={{ justifyContent: 'flex-end', alignItems: 'center' }}
          visible={visible}
          onCannel={() => onCannel?.(false)}
        >
          <View
            style={{
              backgroundColor: theme.lightBackground,
              borderTopRightRadius: theme.borderRadius,
              borderTopLeftRadius: theme.borderRadius,
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
                borderBottomColor: theme.border,
                paddingBottom: 4
              }}
            >
              <Button
                title={'取消'}
                type={'text'}
                onPress={() => onCannel?.(false)}
                titleStyle={{ fontSize: 14 }}
              />

              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>

              <Button
                title={'确定'}
                type={'text'}
                titleStyle={{ fontSize: 14 }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                position: 'relative',
                height: Dimensions.get('window').height * 0.6
              }}
            >
              {options.map((data, index) => (
                <Option data={data} theme={theme} key={index} />
              ))}

              <View
                pointerEvents={'none'}
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: '#eeeeee9f',
                    height: 48,
                    borderRadius: theme.borderRadius,
                    top: Dimensions.get('window').height * 0.1 + 16
                  }
                ]}
              />
            </View>
          </View>
        </Modal>
      )}
    </Consumer>
  )
}

export default Options
