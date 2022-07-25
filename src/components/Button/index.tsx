/**
 * @Author likan
 * @Date 2022-05-21 15:49:30
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import { TinyColor } from '@ctrl/tinycolor'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  ViewStyle
} from 'react-native'
import { Context } from '../../common/Theme'

export interface ButtonProps {
  title: string | JSX.Element
  onPress?: (...args: any) => void
  type?: 'clear' | 'default' | 'text' | 'plain'
  round?: boolean
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  disabled?: boolean
  image?: any
  disabledPress?: (...args: any) => void
}

const Button = ({
  onPress,
  title,
  type = 'default',
  containerStyle,
  titleStyle,
  disabled,
  image,
  disabledPress,
  round = false
}: ButtonProps) => {
  const theme = useContext(Context)

  const [backgroundColor, setBackgroundColor] = useState(theme.accent)
  const [activeColor, setActiveColor] = useState(theme.accent)
  const [titleColor, setTitleColor] = useState(theme.white)
  const [borderColor, setBorderColor] = useState(theme.accent)

  function getColor() {
    if (type === 'default') {
      const tinyColor = new TinyColor(
        // @ts-ignore
        containerStyle?.backgroundColor ?? theme.accent
      )

      setActiveColor(tinyColor.mix('#141414').tint(20).toString())
      setBackgroundColor(tinyColor.tint(20).toString())
      // @ts-ignore
      setTitleColor((titleStyle?.color as string) ?? theme.white)
    } else if (type === 'clear') {
      const tinyColor = new TinyColor(theme.accent + '33')

      setActiveColor(tinyColor.tint(20).toString())
      setBackgroundColor(tinyColor.tint(90).toString())
      setTitleColor(theme.accent)
      setBorderColor('#00000000')
    } else if (type === 'text') {
      const tinyColor = new TinyColor(theme.accent)

      setActiveColor(tinyColor.tint(90).toString())
      setBackgroundColor('#00000000')
      setTitleColor(theme.accent)
      setBorderColor('#00000000')
    } else if (type === 'plain') {
      const tinyColor = new TinyColor(theme.accent)

      setActiveColor(tinyColor.tint(90).toString())
      setBackgroundColor('#00000000')
      setTitleColor(theme.accent)
      setBorderColor(theme.accent)
    }
  }

  useEffect(() => {
    getColor()
  }, [])

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={activeColor}
      onPress={() => (disabled ? disabledPress?.() : onPress?.())}
      style={[
        {
          backgroundColor,
          paddingVertical: type === 'clear' ? 6 : 12,
          paddingHorizontal: type === 'clear' ? 12 : 8,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: round ? theme.borderRadius * 6 : theme.borderRadius,
          borderColor,
          borderWidth: StyleSheet.hairlineWidth
        },
        containerStyle
      ]}
    >
      <Fragment>
        {image && <Image source={image} />}

        <Text
          style={[
            titleStyle,
            {
              color: titleColor,
              fontWeight: 'bold',
              justifyContent: 'center',
              fontSize: 15
            }
          ]}
        >
          {title}
        </Text>
      </Fragment>
    </TouchableHighlight>
  )
}

export default Button
