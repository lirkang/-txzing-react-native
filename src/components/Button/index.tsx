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
import { Themes } from '../../common/Theme'
import { Consumer } from '../../common/ThemeProvider'

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
  function backgroundColor(theme: Themes) {
    if (disabled) {
      return theme.background
    }

    if (type === 'clear') {
      return theme.accent + '33'
    }

    return (
      containerStyle?.backgroundColor ??
      (type === 'text' ? undefined : theme.accent)
    )
  }

  function titleColor(theme: Themes) {
    if (disabled) {
      return theme.placeholderText
    }

    if (titleStyle?.color) {
      return titleStyle.color
    }

    return titleStyle?.color ?? ['text', 'clear'].includes(type)
      ? theme.accent
      : theme.lightBackground
  }

  return (
    <Consumer>
      {props => (
        <TouchableOpacity
          onPress={() => (disabled ? disabledPress?.() : onPress?.())}
          style={[
            containerStyle,
            {
              backgroundColor: backgroundColor(props),
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
                color: titleColor(props),
                fontWeight: 'bold',
                justifyContent: 'center',
                fontSize: 15
              }
            ]}
          >
            {title}
          </Text>
        </TouchableOpacity>
      )}
    </Consumer>
  )
}

export default Button
