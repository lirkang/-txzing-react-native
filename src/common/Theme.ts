/**
 * @Author likan
 * @Date 2022-06-23 10:17:04
 * @FilePath E:\TestSpace\@txzing\react-native\src\utils\setTheme.ts
 */

export interface Themes {
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
}

/** 主题 */
const defaultTheme: Themes = {
  accent: '#0285fe',
  background: '#f6f7fb',
  border: '#cdd0d6',
  darkBackground: '#000000',
  error: '#dc8e89',
  lightBackground: '#ffffff',
  placeholderText: '#9297ae',
  primaryText: '#1d212f',
  regularText: '#6a7388',
  secondaryText: '#40455b'
}

/** 生成主题 */
function createTheme(theme: Themes) {
  const originTheme = defaultTheme

  Object.keys(theme).forEach(key => {
    originTheme[key as keyof Themes] = theme[key as keyof Themes]
  })

  return originTheme
}

export { createTheme, defaultTheme }