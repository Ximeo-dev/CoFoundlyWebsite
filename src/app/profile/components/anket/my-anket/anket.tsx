import AnketCard from './anket-card'

export default function Anket() {
  return (
		<div>
			<AnketCard
				avatarUrl={'/hog.jpg'}
				name={'hog'}
				age={23}
				job={'Designer'}
				skills={['Figma', 'Photoshop']}
				bio={
					'SKIBIDI HOG SKIBIDI HOG SKIBIDI HOG SKIBIDI HOG SKIBIDI HOG SKIBIDI HOG SKIBIDI HOG SKIBIDI HOG'
				}
			/>
		</div>
	)
}