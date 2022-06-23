/**
 * @Author likan
 * @Date 2022-06-23 15:53:12
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Slider\index.tsx
 */

import RNSlider from '@react-native-community/slider'
import React from 'react'
import { View } from 'react-native'
import { IconSlider } from '../../assets'
import { Consumer } from '../../common/ThemeProvider'

interface SliderProps {
  value?: number
  onValueChange?: (number: number) => void
  onSlidingComplete?: (number: number) => void
  maxValue?: number
}

const Slider = ({
  onValueChange,
  value,
  onSlidingComplete,
  maxValue
}: SliderProps) => {
  return (
    <Consumer>
      {theme => (
        <View>
          <RNSlider
            step={1}
            maximumValue={maxValue}
            minimumTrackTintColor={theme.accent}
            maximumTrackTintColor={theme.border}
            onSlidingComplete={onSlidingComplete}
            onValueChange={onValueChange}
            value={value}
            thumbImage={IconSlider}
            style={[{ transform: [{ scaleY: 1.5 }] }]}
          />
        </View>
      )}
    </Consumer>
  )
}

export default Slider
