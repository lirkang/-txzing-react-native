/**
 * @Author likan
 * @Date 2022-07-25 16:56:39
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\SliderView\index.tsx
 */

import React, { useContext } from 'react'
import {
  PanResponder,
  ScrollView,
  TouchableHighlight,
  View
} from 'react-native'
import { Context } from '../../common/Theme'

interface SliderViewProps {
  children?: JSX.Element | Array<JSX.Element>
}

const SliderView = ({ children }: SliderViewProps) => {
  const theme = useContext(Context)

  const { panHandlers } = PanResponder.create({})

  return (
    <View
      style={[
        {
          backgroundColor: theme.white,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24
        }
      ]}
    >
      <TouchableHighlight
        underlayColor={theme.fill}
        style={[{ height: 20, justifyContent: 'center', alignItems: 'center' }]}
      >
        <TouchableHighlight underlayColor={theme.fill} style={{ padding: 4 }}>
          <View
            style={[
              {
                height: 8,
                width: 48,
                backgroundColor: theme.background,
                borderRadius: 24
              }
            ]}
          />
        </TouchableHighlight>
      </TouchableHighlight>

      <ScrollView {...panHandlers}>{children}</ScrollView>
    </View>
  )
}

export default SliderView
