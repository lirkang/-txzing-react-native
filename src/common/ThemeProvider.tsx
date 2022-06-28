/**
 * @Author likan
 * @Date 2022-06-23 11:56:24
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Provider\index.tsx
 */

import React, { createContext } from 'react'
import defaultTheme, { Theme } from './Theme'

const { Consumer, Provider } = createContext(defaultTheme)

interface ThemeProvider {
  theme?: Partial<Theme>
  children: JSX.Element
}

function ThemeProvider({ theme = defaultTheme, children }: ThemeProvider) {
  return (
    <Provider value={Object.assign(defaultTheme, theme)}>{children}</Provider>
  )
}

export default ThemeProvider

export { Consumer }
