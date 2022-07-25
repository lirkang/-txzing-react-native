/**
 * @Author likan
 * @Date 2022-06-23 11:56:24
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Provider\index.tsx
 */

import { createContext, useContext } from 'react'
import { useColorScheme } from 'react-native'

function getColor<
  T extends keyof Omit<Theme, 'getColor' | 'isDark' | 'borderRadius'>,
  F extends keyof Omit<Theme, 'getColor' | 'isDark' | 'borderRadius'>
>(trueValue: T, falseValue: F): T | F | Theme[T] | Theme[F] {
  const theme = useContext(Context)

  if (
    trueValue in theme &&
    falseValue in theme &&
    typeof trueValue === 'string' &&
    typeof falseValue === 'string'
  ) {
    return theme['isDark'] ? theme[trueValue] : theme[falseValue]
  } else {
    return theme['isDark'] ? trueValue : falseValue
  }
}

/** 默认主题 */
export const defaultTheme = {
  /** 强调色 */
  accent: '#0285fe',
  /** 基础背景色 */
  background: '#f6f7fb',
  /** 边框和分割线颜色 */
  border: '#cdd0d6',
  /** 错误警告颜色 */
  error: '#dc8e89',
  /** 占位字体颜色 */
  placeholderText: '#9297ae',
  /** 主要字体颜色 */
  primaryText: '#1d212f',
  /** 常规字体颜色 */
  regularText: '#6a7388',
  /** 次要字体颜色 */
  secondaryText: '#40455b',
  /** 圆角大小 */
  borderRadius: 4,
  /** 纯白色 */
  white: '#ffffff',
  /** 纯黑色 */
  black: '#000000',
  /** 填充色 */
  fill: '#f5f7fa',
  /** 是否暗色 */
  isDark: false,
  /** 获取颜色 */
  getColor
}

/** 深色主题 */
export const darkTheme: typeof defaultTheme = {
  accent: '#0285fe',
  background: '#303030',
  border: '#4c4d4f',
  error: '#dc8e89',
  placeholderText: '#8d9095',
  primaryText: '#e5eaf3',
  regularText: '#cfd3dc',
  secondaryText: '#a3a6ad',
  borderRadius: 4,
  white: '#ffffff',
  black: '#000000',
  fill: '#262727',
  isDark: true,
  getColor
}

export function useTheme() {
  const isDark = useColorScheme()

  return isDark === 'dark' ? darkTheme : defaultTheme
}

export type Theme = typeof defaultTheme

export const Context = createContext(defaultTheme)

export const { Consumer, Provider } = Context
