'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const lines = ['Quality you can trust.', 'Service you can feel.']
const CHAR_DELAY = 50
const LINE_GAP = 600

export function TypedHero() {
   const [typed, setTyped] = useState<string[]>([])
   const [currentLine, setCurrentLine] = useState(0)
   const [currentChar, setCurrentChar] = useState(0)
   const [done, setDone] = useState(false)

   useEffect(() => {
      if (currentLine >= lines.length) {
         setDone(true)
         return
      }

      if (currentChar === 0) {
         const timeout = setTimeout(() => {
            setTyped(prev => [...prev, ''])
            setCurrentChar(1)
         }, currentLine === 0 ? 300 : LINE_GAP)
         return () => clearTimeout(timeout)
      }

      const line = lines[currentLine]
      if (currentChar <= line.length) {
         const timeout = setTimeout(() => {
            setTyped(prev => {
               const next = [...prev]
               next[currentLine] = line.slice(0, currentChar)
               return next
            })
            setCurrentChar(c => c + 1)
         }, CHAR_DELAY)
         return () => clearTimeout(timeout)
      } else {
         setCurrentLine(l => l + 1)
         setCurrentChar(0)
      }
   }, [currentLine, currentChar])

   const cursorLine = done ? lines.length - 1 : currentLine

   return (
      <h1 className="text-display font-bold max-w-4xl">
         {lines.map((line, i) => {
            const isMuted = i === 1
            const showCursor = i === cursorLine
            return (
               <span key={i} className={isMuted ? 'block text-muted-foreground' : 'block'}>
                  {typed[i] || ''}
                  {showCursor && (
                     <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                        className="inline-block w-[2px] h-[0.8em] bg-current align-middle ml-0.5"
                     />
                  )}
               </span>
            )
         })}
      </h1>
   )
}
