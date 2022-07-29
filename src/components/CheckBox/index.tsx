/**
 * @Author likan
 * @Date 2022-07-27 16:10:28
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\CheckBox\index.tsx
 */

import React, { useContext } from 'react'
import { FlexStyle, Text, TouchableOpacity, View } from 'react-native'
import Svg, { Circle, Polyline } from 'react-native-svg'
import { Context } from '../../common/Theme'

export interface CheckBox {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  justifyContent?: FlexStyle['justifyContent']
}

const CheckBox = ({
  checked,
  onChange,
  label,
  justifyContent = 'flex-start'
}: CheckBox) => {
  const theme = useContext(Context)

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent
      }}
    >
      <Svg width='18' height='18' onPress={() => onChange?.(!checked)}>
        <Circle
          cx='9'
          cy='9'
          r='8'
          fill={checked ? theme.accent : 'none'}
          stroke={checked ? theme.accent : theme.border}
          strokeWidth={1}
        />

        <Polyline
          points='4,10 7,13 14,6'
          stroke={checked ? theme.white : 'none'}
          stroke-width='1'
          fill='none'
          stroke-linecap='round'
        />
      </Svg>

      {Boolean(label) && (
        <TouchableOpacity
          onPress={() => onChange?.(!checked)}
          activeOpacity={0.9}
        >
          <Text
            style={{
              color: checked ? theme.primaryText : theme.regularText,
              paddingLeft: 4
            }}
          >
            {label?.toString()}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default CheckBox
