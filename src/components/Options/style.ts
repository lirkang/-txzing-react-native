/**
 *
 * @Author likan
 * @Date 2022-05-20 11:40:21
 * @FileName style.ts
 * @Software Visual Studio Code
 */

import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '../../..'

const selectStyle = StyleSheet.create({
  modalStyle: { justifyContent: 'flex-end', alignItems: 'center' },
  container: {
    backgroundColor: theme.getTheme.lightBackground,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    minHeight: Dimensions.get('window').height * 0.4,
    maxHeight: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width,
    padding: 12
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.getTheme.border,
    paddingBottom: 4
  },
  title: { fontWeight: 'bold', fontSize: 20 },

  selectContainer: {
    flexDirection: 'row',
    position: 'relative',
    height: Dimensions.get('window').height * 0.6
  },
  selectTitle: {
    height: Dimensions.get('window').height * 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomHeight: {
    backgroundColor: '#eeeeee9f',
    height: 48,
    borderRadius: 12,
    top: Dimensions.get('window').height * 0.1 + 16
  }
})

export default selectStyle
