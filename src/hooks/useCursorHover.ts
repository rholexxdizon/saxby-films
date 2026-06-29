import { useCallback } from 'react'
import { useCursor } from '../contexts/CursorContext'

interface CursorHoverOptions {
  text?: string
}

export const useCursorHover = (options: CursorHoverOptions = {}) => {
  const { setHoverState } = useCursor()
  const { text = '' } = options

  const onMouseEnter = useCallback(() => {
    setHoverState(true, text)
  }, [setHoverState, text])

  const onMouseLeave = useCallback(() => {
    setHoverState(false, '')
  }, [setHoverState])

  return {
    onMouseEnter,
    onMouseLeave,
  }
}

export default useCursorHover