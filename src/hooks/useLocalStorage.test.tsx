import { act, renderHook } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('retorna el valor inicial cuando la key no existe', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'valor'))
    expect(result.current[0]).toBe('valor')
  })

  it('guarda y recupera un valor correctamente', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'valor'))
    act(() => {
      const [, setValue] = result.current
      setValue('nuevo')
    })

    const { result: second } = renderHook(() =>
      useLocalStorage('test-key', 'otro')
    )
    expect(second.current[0]).toBe('nuevo')
  })

  it('actualiza el valor y persiste el cambio', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 1))
    act(() => {
      const [, setValue] = result.current
      setValue((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(2)
    expect(window.localStorage.getItem('test-key')).toBe('2')
  })
})
