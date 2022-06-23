/**
 * @Author likan
 * @Date 2022-06-23 10:17:04
 * @FilePath E:\TestSpace\@txzing\react-native\src\utils\setTheme.ts
 */

export interface Theme {
  /** 边框和分割线颜色 */
  border?: string
  /** 强调色 */
  accent?: string
  /** 主要字体颜色 */
  primaryText?: string
  /** 次要字体颜色 */
  secondaryText?: string
  /** 常规字体颜色 */
  regularText?: string
  /** 占位字体颜色 */
  placeholderText?: string
  /** 基础背景色 */
  background?: string
  /** 亮色背景色 */
  lightBackground?: string
  /** 暗色背景色 */
  darkBackground?: string
  /** 错误警告颜色 */
  error?: string
  /** 圆角大小 */
  borderRadius: number
}

/** 主题 */
const defaultTheme: Theme = {
  accent: '#0285fe',
  background: '#f6f7fb',
  border: '#cdd0d6',
  darkBackground: '#000000',
  error: '#dc8e89',
  lightBackground: '#ffffff',
  placeholderText: '#9297ae',
  primaryText: '#1d212f',
  regularText: '#6a7388',
  secondaryText: '#40455b',
  borderRadius: 4
}

/** 生成主题 */
function createTheme(theme: Theme) {
  const originTheme = defaultTheme

  Object.keys(theme).forEach(key => {
    // @ts-ignore
    originTheme[key] = theme[key]
  })

  return originTheme
}

export { createTheme, defaultTheme }
