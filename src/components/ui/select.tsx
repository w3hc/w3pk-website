'use client'

import { Select as ChakraSelect } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface SelectRootProps extends React.ComponentProps<typeof ChakraSelect.Root> {}
export interface SelectTriggerProps extends React.ComponentProps<typeof ChakraSelect.Trigger> {}
export interface SelectContentProps extends React.ComponentProps<typeof ChakraSelect.Content> {}
export interface SelectItemProps extends React.ComponentProps<typeof ChakraSelect.Item> {}

export const SelectRoot = forwardRef<HTMLDivElement, SelectRootProps>((props, ref) => {
  return <ChakraSelect.Root {...props} ref={ref} />
})

SelectRoot.displayName = 'SelectRoot'

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>((props, ref) => {
  return <ChakraSelect.Trigger {...props} ref={ref} />
})

SelectTrigger.displayName = 'SelectTrigger'

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => {
  return <ChakraSelect.Content {...props} ref={ref} />
})

SelectContent.displayName = 'SelectContent'

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  return <ChakraSelect.Item {...props} ref={ref} />
})

SelectItem.displayName = 'SelectItem'

// Simple native select component for basic use cases
export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>((props, ref) => {
  return (
    <select
      ref={ref}
      {...props}
      style={{
        width: '100%',
        padding: '0.5rem',
        borderRadius: '0.375rem',
        borderWidth: '1px',
        backgroundColor: 'transparent',
        ...props.style,
      }}
    />
  )
})

NativeSelect.displayName = 'NativeSelect'
