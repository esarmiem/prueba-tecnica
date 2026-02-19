import { useCallback, useState } from 'react'

const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (value) => {
    setStoredValue((prevValue) => {
      const valueToStore =
        value instanceof Function ? value(prevValue) : value
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch {
        return prevValue
      }
      return valueToStore
    })
  },
  [key]
  )

  return [storedValue, setValue]
}

export default useLocalStorage
