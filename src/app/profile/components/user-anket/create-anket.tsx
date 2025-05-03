import { useForm, FormProvider } from 'react-hook-form'
import { anketService } from '@/services/anket.service'
import { IAnket, IAnketRequest } from '@/types/anket.types'
import ConfirmPersonalData from './steps/confirm-personal-data'
import JobStep from './steps/job-step'
import BioStep from './steps/bio-step'
import SkillsStep from './steps/skills-step'
import PortfolioStep from './steps/portfolio-step'

export default function CreateAnket({
	existingAnket,
	onCreated,
}: {
	existingAnket?: any | null
	onCreated: () => void
}) {
	const methods = useForm<any>({
		defaultValues: {
			name: existingAnket?.name || '',
			age: existingAnket?.age || '',
			job: existingAnket?.job || '',
			bio: existingAnket?.bio || '',
			skills: existingAnket?.skills || [],
			portfolio: existingAnket?.portfolio ? [existingAnket.portfolio] : [''],
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
	})

	const isEditing = !!existingAnket

	const handleSubmit = async (data: IAnketRequest) => {
		if (isEditing) {
			await anketService.editAnket(data)
		} else {
			await anketService.createAnket(data)
		}
		onCreated()
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<div className='step'>
					<ConfirmPersonalData />
				</div>
				<div className='step'>
					<JobStep />
				</div>
				<div className='step'>
					<BioStep />
				</div>
				<div className='step'>
					<SkillsStep />
				</div>
				<div className='step'>
					<PortfolioStep />
				</div>
			</form>
		</FormProvider>
	)
}
