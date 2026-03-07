import React from 'react'
import { Header } from '@/components/Header'
import './globals.css'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '72px' }}>
        {children}
      </div>
    </>
  )
}