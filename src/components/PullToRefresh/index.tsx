/**
 * @Author likan
 * @Date 2022-07-06 16:43:31
 * @FilePath E:\WorkSpace\txztwowheeler\src\component\common\PullToRefresh\index.tsx
 */

import React, { useContext, useState } from 'react'
import {
  ActivityIndicator,
  PanResponder,
  Text,
  View,
  ViewProps
} from 'react-native'
import { Context } from '../../common/Theme'

interface PullToRefreshPropsDTO {
  distance?: number
  onRefresh?: () => Promise<unknown | void>
  children?: JSX.Element | Array<JSX.Element>
  Refresher?: () => JSX.Element
  speed?: number
  viewProps?: ViewProps
  safeDistance?: number
  triggerTitle?: string
  refreshTitle?: string
  defaultTitle?: string
}

const PullToRefresh = ({
  distance = 50,
  onRefresh,
  Refresher,
  children,
  viewProps = {},
  speed = 0.1,
  safeDistance = 5,
  triggerTitle = '松手刷新',
  refreshTitle = '正在刷新中...',
  defaultTitle = '下拉刷新'
}: PullToRefreshPropsDTO) => {
  const [state, setState] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const [, setMoveFlag] = useState(false)

  const theme = useContext(Context)

  let Timer: NodeJS.Timer

  function moveToTargetPosition(targetDistance = 0, negative = false) {
    clearInterval(Timer)

    Timer = setInterval(() => {
      setMoveFlag(m => {
        if (m) {
          clearInterval(Timer)
        } else {
          setState(state => {
            if (
              negative
                ? state + speed >= targetDistance
                : state - speed <= targetDistance
            ) {
              clearInterval(Timer)

              return targetDistance
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
    onMoveShouldSetPanResponder: (evt, { dy }) => {
      if (Math.abs(dy) > safeDistance || Math.abs(dy) > safeDistance) {
        return true
      } else if (Math.abs(dy) <= safeDistance || Math.abs(dy) <= safeDistance) {
        return false
      }

      return true
    },

    onPanResponderGrant() {
      clearInterval(Timer)
      setMoveFlag(true)
    },

    onPanResponderMove: (evt, { dy }) => {
      if (refreshing && state + dy < distance) {
        return
      } else {
        setState(preState => {
          setOpacity(
            (preState + dy) / distance >= 1 ? 1 : (preState + dy) / distance
          )

          return preState + dy * 0.33
        })
      }
    },

    onPanResponderRelease: async () => {
      setMoveFlag(false)

      if (refreshing) {
        return moveToTargetPosition(distance)
      } else if (state <= 0) {
        return moveToTargetPosition(0, true)
      } else if (state >= distance) {
        moveToTargetPosition(distance)

        setRefreshing(true)

        await onRefresh?.().finally(() => {
          setOpacity(0)
          moveToTargetPosition()

          setRefreshing(false)
        })
      }

      setOpacity(0)

      setMoveFlag(false)

      moveToTargetPosition()

      setRefreshing(false)
    }
  })

  const getTitle = () => {
    if (refreshing) {
      return refreshTitle
    } else if (state > distance) {
      return triggerTitle
    } else {
      return defaultTitle
    }
  }

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          height: distance,
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {Refresher ? (
          <Refresher />
        ) : (
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                opacity,
                transform: [{ scale: opacity }]
              }
            ]}
          >
            <ActivityIndicator
              animating
              color={theme.regularText}
              size={'small'}
            />

            <Text
              style={{
                alignItems: 'center',
                color: theme.regularText,
                textAlign: 'center',
                opacity,
                transform: [{ scale: opacity }]
              }}
            >
              &nbsp;{getTitle()}
            </Text>
          </View>
        )}
      </View>

      <View
        {...viewProps}
        style={[
          {
            minHeight: distance,
            height: '100%',
            transform: [{ translateY: state }]
          },
          viewProps.style
        ]}
        {...panHandlers}
      >
        {children}
      </View>
    </View>
  )
}

export default PullToRefresh
