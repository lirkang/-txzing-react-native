/**
 *
 * @Author likan
 * @Date 2022-05-19 14:15:16
 * @FileName index.tsx
 * @Software Visual Studio Code
 */

import React, { createRef, useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// @ts-ignore
import { ParallelPicker } from 'react-native-slidepicker'
import { Context } from '../../common/Theme'
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
  onChange?: (data: Array<Option>) => void
  value?: Array<Array<Pick<Option, 'id'>>>
  type?: 'date' | 'custom'
  isLeadingZero?: boolean
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
  type = 'custom',
  isLeadingZero = true
}: OptionsProps) => {
  const SelectRef = createRef<any>()

  const theme = useContext(Context)

  const [option, setOption] = useState<Array<Array<Option>>>([])

  const [dateConfig, setDateConfig] = useKeysState({
    year: 0,
    month: 0,
    day: 0
  })

  function leadingZero(number: number) {
    const { length } = number.toString()

    return isLeadingZero ? (length === 1 ? `0${number}` : number) : number
  }

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
      months.push({ id: leadingZero(lastMonth), name: leadingZero(lastMonth) })
    }

    setDateConfig({ month })

    setOption(option => [option[0] ?? [], months ?? [], option[2] ?? []])

    getDay()
  }

  function getDay(specificDate = dateConfig) {
    let day = 1
    let days: Array<Option> = []

    const { month, year } = specificDate

    const date = new Date(year, month, 0)

    for (let lastDay = day; lastDay <= date.getDate(); lastDay++) {
      days.push({ id: leadingZero(lastDay), name: leadingZero(lastDay) })
    }

    setDateConfig({ day })

    setOption(option => [option[0] ?? [], option[1] ?? [], days ?? []])
  }

  function onOnceChange(data: Array<Option>) {
    if (type === 'date' && data[1].id !== leadingZero(dateConfig.month)) {
      setDateConfig({ month: Number(data[1].name), day: 1 }, getDay)
    } else if (type === 'date' && data[0].id !== dateConfig.year) {
      setDateConfig({ year: Number(data[0].name), month: 0, day: 1 }, getMonth)
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
    <Modal
      visible={visible}
      style={{ justifyContent: 'flex-end' }}
      onCancel={onCancel}
    >
      <ParallelPicker
        ref={SelectRef}
        pickerStyle={{
          activeBgColor: theme.getColor('background', 'fill'),
          activeFontColor: theme.accent,
          activeFontSize: 18,
          normalBgColor: theme.getColor('fill', 'white'),
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
              backgroundColor: theme.getColor('fill', 'white'),
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

            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: theme.primaryText
              }}
            >
              {title}
            </Text>

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
  )
}

export default Options
