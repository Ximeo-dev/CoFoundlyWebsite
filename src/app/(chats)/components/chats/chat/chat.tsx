import ChatHeader from './chat-header'
import { Message } from './message'
import MessageField from './message-field'

export default function Chat({id}: {id:string}) {
  return (
		<div className='w-8/12 border-r border-border h-full grid' style={{
			gridTemplateRows: '.6fr 6fr .6fr',
		}}>
			<ChatHeader />
			<div className='p-5 border-t border-border'>
				<Message />
			</div>
				<MessageField />
		</div>
	)
}