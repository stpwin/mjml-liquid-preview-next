"use client"

import { createContext, useContext, useState } from "react"

interface UIStateContextType {
  activeState: string | null
  setActiveState: (id: string | null) => void
}

const UIStateContext = createContext<UIStateContextType>({
  activeState: null,
  setActiveState: () => {},
})

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [activeState, setActiveState] = useState<string | null>(null)

  return (
    <UIStateContext.Provider value={{ activeState, setActiveState }}>
      {children}
    </UIStateContext.Provider>
  )
}

export function useUIState(stateId: string) {
  const { activeState, setActiveState } = useContext(UIStateContext)
  
  const isOpen = activeState === stateId
  const onOpenChange = (open: boolean) => {
    setActiveState(open ? stateId : null)
  }

  return { isOpen, onOpenChange }
} 