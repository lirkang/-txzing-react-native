/**
 * @Author likan
 * @Date 2022-07-29 14:53:54
 * @FilePath E:\TestSpace\@txzing\react-native\src\Icons\Check.tsx
 */

import React, { useContext } from 'react'
import Svg, { Circle, Polyline } from 'react-native-svg'
import { Context } from '../common/Theme'

const Check = () => {
  const theme = useContext(Context)

  return (
    <Svg width='18' height='18'>
      <Circle
        cx='9'
        cy='9'
        r='8'
        fill={theme.accent}
        stroke={theme.accent}
        strokeWidth={1}
      />

      <Polyline
        points='4,10 7,13 14,6'
        stroke={theme.white}
        stroke-width='1'
        fill='none'
        stroke-linecap='round'
      />
    </Svg>
  )
}

export default Check
