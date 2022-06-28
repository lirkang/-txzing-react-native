/**
 *
 * @Author likan
 * @Date 2022-05-19 14:15:16
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React, { createRef, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// @ts-ignore
import { ParallelPicker } from 'react-native-slidepicker'
import { Consumer } from '../../common/ThemeProvider'
import useKeysState from '../../hooks/useKeysState'
import Button from '../Button'
import Modal from '../Modal'

type Option = { name: string | number; id: string | number }

interface OptionsProps {
  title?: string
  visible?: boolean
  options?: Array<Array<Option>>
  autoClose?: boolean
  onCancel?: (bool: boolean) => void
  onConfirm?: (data: Array<Option>) => void
  onChange?: (data: Array<Array<Option>>) => void
  value?: Array<Array<Pick<Option, 'id'>>>
  type?: 'date' | 'custom'
}

const Options = ({
  options = [],
  title = '选择',
  visible = false,
  onCancel,
  onConfirm,
  autoClose = false,
  onChange,
  value,
  type = 'custom'
}: OptionsProps) => {
  const SelectRef = createRef<any>()

  const [option, setOption] = useState<Array<Array<Option>>>([])

  const [dateConfig, setDateConfig] = useKeysState({
    year: 0,
    month: 0,
    day: 0
  })

  function getYear() {
    const year = new Date().getFullYear()
    const years: Array<Option> = []

    setDateConfig({ year })

    for (let lastYear = year; lastYear >= 1950; lastYear--) {
      years.push({ id: lastYear, name: lastYear })
    }

    setOption(option => [years ?? [], option[1] ?? [], option[2] ?? []])

    getMonth()
  }

  function getMonth() {
    let month = 1
    let months: Array<Option> = []

    for (let lastMonth = month; lastMonth <= 12; lastMonth++) {
      months.push({ id: lastMonth, name: lastMonth })
    }

    setDateConfig({ month })

    setOption(option => [option[0] ?? [], months ?? [], option[2] ?? []])

    getDay()
  }

  function getDay() {
    let day = 1
    let days: Array<Option> = []

    const { month, year } = dateConfig

    const date = new Date(year, month, 0)

    for (let lastDay = day; lastDay <= date.getDate(); lastDay++) {
      days.push({ id: lastDay, name: lastDay })
    }

    setDateConfig({ day })

    setOption(option => [option[0] ?? [], option[1] ?? [], days ?? []])
  }

  function onOnceChange(data: Array<Array<Option>>) {
    if (type === 'date') {
      console.log(data)
    }

    onChange?.(data)
  }

  useEffect(() => {
    if (type === 'date') {
      getYear()
    } else {
      setOption(options)
    }
  }, [])

  return (
    <Consumer>
      {theme => (
        <Modal
          visible={visible}
          modalStyle={{ justifyContent: 'flex-end' }}
          onCancel={onCancel}
        >
          <ParallelPicker
            ref={SelectRef}
            pickerStyle={{
              activeBgColor: theme.background,
              activeFontColor: theme.accent,
              activeFontSize: 18,
              normalBgColor: theme.lightBackground,
              normalFontColor: theme.regularText,
              normalFontSize: 16,
              normalBgOpacity: 1,
              visibleNum: 3,
              itemHeight: 64
            }}
            value={value}
            onceChange={onOnceChange}
            dataSource={option}
            customHead={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: theme.lightBackground,
                  height: 64,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: theme.border,
                  borderTopLeftRadius: theme.borderRadius * 2,
                  borderTopRightRadius: theme.borderRadius * 2
                }}
              >
                <Button
                  type={'text'}
                  title={'取消'}
                  onPress={() => onCancel?.(false)}
                />

                <Text style={{ fontSize: 18, fontWeight: '500' }}>{title}</Text>

                <Button
                  type={'text'}
                  title={'确定'}
                  onPress={() => {
                    onConfirm?.(SelectRef.current.resultArray)

                    autoClose && onCancel?.(false)
                  }}
                />
              </View>
            }
          />
        </Modal>
      )}
    </Consumer>
  )
}

export default Options
