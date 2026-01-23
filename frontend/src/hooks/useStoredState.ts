import { useEffect, useState } from 'react'

export const useStoredState = <T,>(
  load: () => T,
  save: (value: T) => void,
) => {
  const [value, setValue] = useState<T>(load)

  useEffect(() => {
    save(value)
  }, [value, save])

  return [value, setValue] as const
}
