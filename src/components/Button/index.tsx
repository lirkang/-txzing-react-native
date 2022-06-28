/**
 * @Author likan
 * @Date 2022-05-21 15:49:30
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React, { Fragment } from 'react'
import {
  Image,
  Text,
  TextStyle,
  TouchableHighlight,
  ViewStyle
} from 'react-native'
import { Theme } from '../../common/Theme'
import { Consumer } from '../../common/ThemeProvider'

export interface ButtonProps {
  title?: string | JSX.Element
  onPress?: (...args: any) => void
  type?: 'clear' | 'default' | 'text'
  round?: boolean
  containerStyle?: ViewStyle
  titleStyle?: TextStyle
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
  function backgroundColor(theme: Theme) {
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

  function titleColor(theme: Theme) {
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
      {theme => (
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={backgroundColor(theme) ?? theme.lightBackground}
          onPress={() => (disabled ? disabledPress?.() : onPress?.())}
          style={[
            {
              backgroundColor: backgroundColor(theme),
              paddingVertical: type === 'clear' ? 6 : 12,
              paddingHorizontal: type === 'clear' ? 12 : 8,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: round ? theme.borderRadius * 6 : theme.borderRadius
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
                  color: titleColor(theme),
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
      )}
    </Consumer>
  )
}

export default Button
