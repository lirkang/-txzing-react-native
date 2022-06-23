/**
 * @Author likan
 * @Date 2022-06-23 15:53:12
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Slider\index.tsx
 */

import RNSlider from '@react-native-community/slider'
import React from 'react'
import { View } from 'react-native'
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
            maximumTrackTintColor={theme.regularText}
            onSlidingComplete={onSlidingComplete}
            onValueChange={onValueChange}
            value={value}
            thumbImage={require('../../icon_close_car.png')}
            style={[{ transform: [{ scaleY: 1.3 }] }]}
          />
        </View>
      )}
    </Consumer>
  )
}

export default Slider
