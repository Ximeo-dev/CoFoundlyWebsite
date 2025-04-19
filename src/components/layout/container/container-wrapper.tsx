import { ReactNode } from 'react'

export default function ContainerWrapper({ children }: { children: ReactNode }) {
  return (
    <div className='container mx-auto px-5 sm:px-10'>
      {children}
    </div>
  )
}