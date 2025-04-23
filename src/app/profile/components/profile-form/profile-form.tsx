'use client'

import { useForm, useWatch } from 'react-hook-form'

interface IProfileForm {
	name: string
	age: string
	role: string
	tags: string
	bio: string
}

export default function ProfileForm() {
  const { register, control } = useForm<IProfileForm>({
    mode: 'onChange'
  })

  const values = useWatch({ control })
  const tagList = values?.tags?.split(',').map((tag) => tag.trim()) || []

  return (
    <div className='p-10'>profile-form</div>
  )
}