/**
 * @Author likan
 * @Date 2022-07-29 15:13:52
 * @FilePath E:\TestSpace\@txzing\react-native\src\Icons\Arrow.tsx
 */

import React, { useContext } from 'react'
import Svg, { Polyline } from 'react-native-svg'
import { Context } from '../common/Theme'

const Arrow = () => {
  const theme = useContext(Context)

  return (
    <Svg width={20} height={20}>
      <Polyline
        points={'10,2 18,10 10,18'}
        stroke={theme.border}
        stroke-width={2}
        stroke-linecap={'round'}
      />
    </Svg>
  )
}

export default Arrow
