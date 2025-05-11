'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'

export default function MessageField() {
  const [message, setMessage] = useState('')

  return (
		<div className='border-t border-border p-5 flex items-center justify-between'>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        className='outline-none w-4/5 bg-[#1a1a1a] px-4 py-2 border-border rounded-[30px]'
        placeholder='Поиск...'
      />
      <button className='cursor-pointer hover:text-cyan-200 transition-colors duration-300 ease-linear'>
        <Send />
      </button>
		</div>
	)
}