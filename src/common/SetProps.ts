/**
 * @Author likan
 * @Date 2022-06-23 14:49:57
 * @FilePath E:\TestSpace\@txzing\react-native\src\common\SetProps.ts
 */

import setGlobalProps from 'react-native-props'
import { Theme } from './Theme'

function setProps(theme: Theme) {
  setGlobalProps('ScrollView', {
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false
  })('Text', {
    allowFontScaling: false,
    numberOfLines: 1,
    style: [{ color: theme.primaryText }]
  })('TextInput', {
    allowFontScaling: false,
    numberOfLines: 1,
    style: [{ paddingVertical: 0 }]
  })('Image', {
    resizeMode: 'cover'
  })('TouchableOpacity', {
    activeOpacity: 0.6
  })
}

export default setProps
