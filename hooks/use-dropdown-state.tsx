"use client"

import { createContext, useContext, useState } from "react"

interface DropdownContextType {
  activeDropdown: string | null
  setActiveDropdown: (id: string | null) => void
}

const DropdownContext = createContext<DropdownContextType>({
  activeDropdown: null,
  setActiveDropdown: () => {},
})

export function DropdownProvider({ children }: { children: React.ReactNode }) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <DropdownContext.Provider value={{ activeDropdown, setActiveDropdown }}>
      {children}
    </DropdownContext.Provider>
  )
}

export function useDropdownState(dropdownId: string) {
  const { activeDropdown, setActiveDropdown } = useContext(DropdownContext)
  
  const isOpen = activeDropdown === dropdownId
  const onOpenChange = (open: boolean) => {
    setActiveDropdown(open ? dropdownId : null)
  }

  return { isOpen, onOpenChange }
} 