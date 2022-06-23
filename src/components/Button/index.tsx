/**
 * @Author likan
 * @Date 2022-05-21 15:49:30
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React from 'react'
import {
  Image,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import { theme, useForceUpdate } from '../../..'

interface ButtonProps {
  title?: string | JSX.Element
  onPress?: () => void
  type?: 'clear' | 'default' | 'text'
  containerStyle?: ViewStyle
  titleStyle?: TextStyle
  disabled?: boolean
  image?: any
  disabledPress?: () => void
}

const Button = ({
  onPress,
  title,
  type = 'default',
  containerStyle,
  titleStyle,
  disabled,
  image,
  disabledPress
}: ButtonProps) => {
  const forceUpdate = useForceUpdate()

  theme.addListener(forceUpdate)

  function backgroundColor() {
    if (disabled) {
      return theme.getTheme.background
    }

    if (type === 'clear') {
      return theme.getTheme.accent + '33'
    }

    return (
      containerStyle?.backgroundColor ??
      (type === 'text' ? undefined : theme.getTheme.accent)
    )
  }

  function titleColor() {
    if (disabled) {
      return theme.getTheme.placeholderText
    }

    if (titleStyle?.color) {
      return titleStyle.color
    }

    return titleStyle?.color ?? ['text', 'clear'].includes(type)
      ? theme.getTheme.accent
      : theme.getTheme.lightBackground
  }

  return (
    <TouchableOpacity
      onPress={() => (disabled ? disabledPress?.() : onPress?.())}
      style={[
        containerStyle,
        {
          backgroundColor: backgroundColor(),
          paddingVertical: type === 'clear' ? 6 : 12,
          paddingHorizontal: type === 'clear' ? 12 : 8,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 24
        }
      ]}
    >
      {image && <Image source={image} />}

      <Text
        style={[
          titleStyle,
          {
            color: titleColor(),
            fontWeight: 'bold',
            justifyContent: 'center',
            fontSize: 15
          }
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
