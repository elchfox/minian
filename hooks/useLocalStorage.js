import { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = 'minian-'

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState(() => {
    const jsonValue = AsyncStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    AsyncStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
