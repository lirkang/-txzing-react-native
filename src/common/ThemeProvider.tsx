/**
 * @Author likan
 * @Date 2022-06-23 11:56:24
 * @FilePath E:\TestSpace\@txzing\react-native\src\components\Provider\index.tsx
 */

import { createContext } from 'react'
import { defaultTheme } from './Theme'

export const {
  Consumer,
  Provider: ThemeProvider,
  displayName
} = createContext(defaultTheme)
