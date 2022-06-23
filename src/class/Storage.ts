/**
 * @Author likan
 * @Date 2022-06-23 10:01:05
 * @FilePath E:\TestSpace\@txzing\react-native\src\class\Storage.ts
 */

import AsyncStorage from '@react-native-async-storage/async-storage'
import { isArray, uniqBy } from 'lodash'

/** 本地存储类, 这是一个需要被继承的类, 请避免直接使用这个类 */
export default class Storage<T = unknown> {
  /* key */
  private readonly key: string

  /* 默认数据 */
  private readonly defaultStorage: T

  /**
   * @param key 唯一标识
   * @param defaultStorage 默认值
   */
  constructor(key: string, defaultStorage: T) {
    this.defaultStorage = defaultStorage
    this.key = key
  }

  /**
   * 清空数据到默认状态
   * @returns
   */
  protected async clearStorage(): Promise<T> {
    await AsyncStorage.setItem(this.key, JSON.stringify(this.defaultStorage))

    return this.defaultStorage
  }

  /**
   * 获取存储
   * @returns {T} 数据
   */
  protected async getStorage(): Promise<T> {
    const data = await AsyncStorage.getItem(this.key)

    if (!data) {
      return await this.clearStorage()
    }

    const result = JSON.parse(data)

    return result?.rawData ?? result
  }

  /**
   * 手动设置存储
   * @param data 需要存储的数据
   * @returns {T} 新的存储数据
   */
  protected async saveToStorage(data: T): Promise<T> {
    if (isArray(data)) {
      // @ts-ignore
      data = uniqBy(data, 'id')
    }

    await AsyncStorage.setItem(this.key, JSON.stringify(data))

    return data
  }

  /**
   * 插入到储存
   * @param {(data: T) => T | Promise<T>} callback 回调函数
   * @returns {T} 新的存储数据
   */
  protected async pushToStorage(
    callback: (data: T) => T | Promise<T>
  ): Promise<T> {
    // 把已有的数据交给回调函数处理, 返回一个需要存储的新数据
    const data = await callback(await this.getStorage())

    return await this.saveToStorage(data)
  }
}
