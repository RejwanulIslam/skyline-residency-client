import React, { createContext } from 'react'
export const themcontex=createContext(null)
export default function ThemContex({children}) {
    const themValue={
        'djfdjf':'sdjfjef'
    }
  return (
    <themcontex.Provider value={themValue}>
        {children}
    </themcontex.Provider>
  )
}
