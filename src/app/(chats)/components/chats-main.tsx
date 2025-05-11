'use client'

import { useEffect, useState } from 'react'
import styles from '../chats.module.css'
import Sidebar from './sidebar/sidebar'
import Chat from './chats/chat-wrapper'
import ChatWrapper from './chats/chat-wrapper'

export default function ChatsMain() {
  const validTabs = ['chats', 'friends', 'settings']
  const localStorageKey = 'chatsTab'

  const [selected, setSelected] = useState('chat')

  useEffect(() => {
    try {
      const savedTab = localStorage.getItem(localStorageKey)
      if (savedTab && validTabs.includes(savedTab)) {
        setSelected(savedTab)
      }
    } catch {

    }
  }, [])

  useEffect(() => {
		localStorage.setItem(localStorageKey, selected)
	}, [selected])

  const renderContent = () => {
    switch (selected) {
			case 'chat':
				return <Chat />
			case 'friends':
				return <div>friends</div>
			case 'settings':
				return <div>settings</div>
			default:
				return <ChatWrapper />
		}
  }
  

  return (
		<main className={styles.layout}>
			<Sidebar onSelect={setSelected} selected={selected} />
      <div>
        {renderContent()}
      </div>
		</main>
	)
}