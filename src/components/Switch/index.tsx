/**
 * @Author likan
 * @Date 2022-06-23 15:13:31
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Switch\index.tsx
 */

import { animated, useSpring } from '@react-spring/native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Consumer } from '../../common/ThemeProvider'

interface SwitchProps {
  enabled?: boolean
  onChange?: (bool: boolean) => void
  disabled?: boolean
}

const Switch = ({ enabled, onChange, disabled }: SwitchProps) => {
  const AnimatedView = animated(View)

  const style = useSpring({
    to: { marginLeft: enabled ? 20 : 0 },
    from: { marginLeft: enabled ? 0 : 20 }
  })

  return (
    <Consumer>
      {theme => (
        <TouchableOpacity onPress={() => onChange?.(!enabled)}>
          <View
            style={[
              {
                position: 'relative',
                backgroundColor: enabled ? theme.accent : theme.border,
                borderRadius: theme.borderRadius * 8,
                width: 48,
                padding: 4
              }
            ]}
          >
            <AnimatedView
              style={[
                {
                  backgroundColor: theme.lightBackground,
                  width: 20,
                  height: 20,
                  borderRadius: theme.borderRadius * 8,
                  marginLeft: enabled ? 20 : 0
                },
                style
              ]}
            >
              <></>
            </AnimatedView>
          </View>
        </TouchableOpacity>
      )}
    </Consumer>
  )
}

export default Switch
