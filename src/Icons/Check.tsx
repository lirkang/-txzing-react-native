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
    <Svg width={20} height={20}>
      <Circle
        cx={10}
        cy={10}
        r={9}
        fill={theme.accent}
        stroke={theme.accent}
        strokeWidth={1}
      />

      <Polyline
        points={'5,11 8,14 15,7'}
        stroke={theme.white}
        stroke-width={1}
        fill={'none'}
        stroke-linecap={'round'}
      />
    </Svg>
  )
}

export default Check
