/**
 * @Author likan
 * @Date 2022-06-23 15:13:31
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Switch\index.tsx
 */

import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Context } from '../../common/Theme'

export interface SwitchProps {
  enabled?: boolean
  onChange?: (bool: boolean) => void
  disabled?: boolean
}

const Switch = ({ enabled, onChange, disabled }: SwitchProps) => {
  const theme = useContext(Context)

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onChange?.(!enabled)}
      style={{ width: 48 }}
    >
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
        <View
          style={[
            {
              backgroundColor: theme.white,
              width: 20,
              height: 20,
              borderRadius: theme.borderRadius * 8,
              marginLeft: enabled ? 20 : 0
            }
          ]}
        />
      </View>
    </TouchableOpacity>
  )
}

export default Switch
