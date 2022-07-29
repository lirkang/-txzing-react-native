/**
 * @Author likan
 * @Date 2022-07-29 14:52:57
 * @FilePath E:\TestSpace\@txzing\react-native\src\Icons\Close.tsx
 */

import React, { useContext } from 'react'
import Svg, { Circle, Polyline } from 'react-native-svg'
import { Context } from '../common/Theme'

const Close = () => {
  const theme = useContext(Context)

  return (
    <Svg width={20} height={20} style={{ transform: [{ rotate: '45deg' }] }}>
      <Circle cx={10} cy={10} r={10} fill={theme.border} />

      <Polyline
        points={'3,10 17,10'}
        strokeWidth={2}
        stroke={theme.regularText}
        strokeLinecap={'round'}
      />

      <Polyline
        points={'10,3 10,17'}
        strokeWidth={2}
        stroke={theme.regularText}
        strokeLinecap={'round'}
      />
    </Svg>
  )
}

export default Close
