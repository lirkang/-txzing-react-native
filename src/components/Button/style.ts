/**
 *
 * @Author likan
 * @Date 2022-05-21 15:58:07
 * @FileName style.ts
 * @Software Visual Studio Code
 */

import { StyleSheet } from 'react-native'

const buttonStyle = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24
  },

  title: {
    fontWeight: 'bold',
    justifyContent: 'center',
    fontSize: 15
  }
})

export default buttonStyle
