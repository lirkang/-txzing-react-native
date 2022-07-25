/**
 * @Author likan
 * @Date 2022-07-07 10:35:32
 * @FilePath E:\WorkSpace\txztwowheeler\src\component\common\SwipeListItem\index.tsx
 */

import React, { Fragment, useState } from 'react'
import { PanResponder, View } from 'react-native'

interface SwipeListItemPropsDTO {
  leftCom?: () => JSX.Element
  rightCom?: () => JSX.Element
  leftDistance?: number
  rightDistance?: number
  children?: JSX.Element | Array<JSX.Element>
  speed?: number
  safeDistance?: number
  onRelease?: () => void
}

const SwipeListItem = ({
  leftCom,
  rightCom,
  leftDistance = 0,
  rightDistance = 0,
  children,
  speed = 0.1,
  safeDistance = 5,
  onRelease
}: SwipeListItemPropsDTO) => {
  const [translateX, setTranslateX] = useState(0)
  const [, setMoveFlag] = useState(false)

  let Timer: NodeJS.Timeout

  function moveToTargetPosition(targetDistance = 0, negative = false) {
    clearInterval(Timer)

    Timer = setInterval(() => {
      setMoveFlag(m => {
        if (m) {
          clearInterval(Timer)
        } else {
          setTranslateX(state => {
            if (
              negative
                ? state + speed >= -targetDistance
                : state - speed <= targetDistance
            ) {
              clearInterval(Timer)

              return negative ? -targetDistance : targetDistance
            } else {
              const step = negative
                ? targetDistance + state
                : state - targetDistance

              return state - step * speed
            }
          })
        }

        return m
      })
    }, 1)
  }

  const { panHandlers } = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, { dx }) => {
      if (Math.abs(dx) > safeDistance || Math.abs(dx) > safeDistance) {
        return true
      } else if (Math.abs(dx) <= safeDistance || Math.abs(dx) <= safeDistance) {
        return false
      }

      return true
    },

    onPanResponderGrant() {
      clearInterval(Timer)
      setMoveFlag(true)
    },

    onPanResponderMove: (evt, { dx }) => {
      setTranslateX(translateX => {
        return translateX + dx * 1
      })
    },

    onPanResponderRelease: async () => {
      if (translateX < 0) {
        if (Math.abs(translateX) >= rightDistance) {
          moveToTargetPosition(rightDistance, true)
        } else {
          moveToTargetPosition(0, true)
        }
      } else if (translateX > leftDistance) {
        moveToTargetPosition(leftDistance)
      } else {
        moveToTargetPosition(0)
      }

      setMoveFlag(false)

      onRelease?.()
    }
  })

  return (
    <View style={[{ position: 'relative' }]}>
      <View
        style={[{ position: 'absolute', left: 0, zIndex: 0, height: '100%' }]}
      >
        {leftCom?.()}
      </View>

      <View
        {...panHandlers}
        style={[
          { transform: [{ translateX }], position: 'relative', zIndex: 1 }
        ]}
      >
        {children}
      </View>

      <View
        style={[{ position: 'absolute', right: 0, zIndex: 0, height: '100%' }]}
      >
        <Fragment>{rightCom?.()}</Fragment>
      </View>
    </View>
  )
}

export default SwipeListItem
