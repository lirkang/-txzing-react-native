/**
 * @Author likan
 * @Date 2022-06-23 15:53:12
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Slider\index.tsx
 */

import RNSlider from '@react-native-community/slider'
import React, { useEffect, useState } from 'react'
import { Image, Platform, StyleSheet, View } from 'react-native'
import { IconSlider } from '../../assets'
import { Consumer } from '../../common/ThemeProvider'

export interface SliderProps {
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
  const [position, setPosition] = useState(0)
  const [imageWidth, setImageWidth] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)
  const [sliderValue, setSliderValue] = useState(value || 0)

  function getPosition(value: number) {
    if (maxValue && value) {
      const distance = (value / maxValue) * sliderWidth

      setPosition(distance)
    }
  }

  useEffect(() => {
    getPosition(sliderValue)
    onValueChange?.(sliderValue)
  }, [sliderValue])

  return (
    <Consumer>
      {theme => (
        <View
          style={{ position: 'relative', justifyContent: 'center' }}
          onLayout={({ nativeEvent }) =>
            setSliderWidth(nativeEvent.layout.width)
          }
        >
          <RNSlider
            step={1}
            maximumValue={maxValue}
            minimumTrackTintColor={theme.accent}
            maximumTrackTintColor={theme.border}
            onSlidingComplete={onSlidingComplete}
            onValueChange={setSliderValue}
            value={value}
            thumbImage={IconSlider}
            style={{
              marginHorizontal: Platform.select({ android: -10, ios: 0 })
            }}
          />

          <View
            pointerEvents={'none'}
            style={[
              {
                position: 'absolute',
                backgroundColor: theme.lightBackground,
                borderRadius: theme.borderRadius,
                borderColor: theme.border,
                borderWidth: StyleSheet.hairlineWidth,
                left:
                  position + (Platform.select({ android: -10, ios: 0 }) ?? 0)
              }
            ]}
          >
            <Image
              onLayout={({ nativeEvent }) =>
                setImageWidth(nativeEvent.layout.width)
              }
              source={IconSlider}
            />
          </View>
        </View>
      )}
    </Consumer>
  )
}

export default Slider
