import ProfileForm from './profile-form/profile-form'

export default function Profile() {
  return (
		<div className='min-h-screen'>
			<div className='pt-14 sm:pt-[80px] md:pt-[120px] lg:pt-[110px] xl:pt-[160px] w-full'>
				<div className='w-full bg-white dark:bg-[#151515] border border-[#d9d7d7] dark:border-[#3a3a3a] rounded-[15px] h-[500px] grid grid-cols-2 place-items-center'>
					<ProfileForm />
					<div>profile-card</div>
				</div>
			</div>
		</div>
	)
}