/**
 *
 * @Author likan
 * @Date 2022-05-19 16:55:51
 * @FileName style.ts
 * @Software Visual Studio Code
 */

import { Dimensions, StyleSheet } from 'react-native'

const optionStyle = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    overflow: 'hidden',
    paddingBottom: 24
  },
  scrollContainer: {
    maxHeight: Dimensions.get('window').height * 0.4,
    borderBottomColor: '#f6f6f7',
    borderBottomWidth: 6
  },
  itemContainer: {
    paddingVertical: 20,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: 16
  },
  channelButton: {
    paddingVertical: 16
  }
})

export default optionStyle
