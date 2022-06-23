/**
 * @Author likan
 * @Date 2022-06-02 11:56:03
 * @FilePath E:\WorkSpace\txzeveryapp\src\component\base\Toast\style.ts
 */

import { StatusBar, StyleSheet } from 'react-native'

const toastStyle = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  top: {
    justifyContent: 'flex-start',
    top: (StatusBar.currentHeight || 0) * 3
  },

  center: {
    justifyContent: 'center'
  },

  bottom: {
    justifyContent: 'flex-end',
    bottom: (StatusBar.currentHeight || 0) * 4
  },

  title: {
    color: '#ffffffee',
    borderRadius: 50,
    backgroundColor: '#00000090',
    fontSize: 15
  }
})

export default toastStyle
