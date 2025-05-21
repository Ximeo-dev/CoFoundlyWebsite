'use client'

import { IParticipant } from '@/types/chat.types'
import { CircleUser, Info, X } from 'lucide-react'
import Avatar from '@/app/(auth)/components/profile-info/avatar'
import { Button } from '@/components/ui/shadcn/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface ChatSidebarProps {
	correspondent?: IParticipant
	isOpen: boolean
	onClose: () => void
}

export default function ChatSidebar({
	correspondent,
	isOpen,
	onClose,
}: ChatSidebarProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<>
			{isOpen && correspondent && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='fixed inset-0 z-40 bg-black/50 sm:hidden'
						onClick={onClose}
					/>

					<motion.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 30,
							bounce: 0.2,
						}}
						className='fixed inset-y-0 right-0 z-50 w-full max-w-lg sm:relative sm:z-auto'
					>
						<div className='w-full h-full bg-background border-l border-border overflow-y-auto overflow-x-hidden'>
							<div className='h-full flex flex-col'>
								<div className='flex justify-between items-center mb-6 p-4'>
									<h3 className='text-lg font-semibold'>Информация</h3>
									<Button
										variant='ghost'
										size='icon'
										onClick={onClose}
										className='rounded-full'
									>
										<X size={18} />
									</Button>
								</div>

								<div className='flex items-center border-b border-border px-4 pb-4'>
									<motion.div
										initial={{ scale: 0.8, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ delay: 0.1 }}
									>
										<Avatar
											size={128}
											id={correspondent.userId}
											hasAvatar={correspondent.profile?.hasAvatar ?? false}
											bigChatAvatar
										/>
									</motion.div>

									<div className='flex flex-col ml-5 gap-y-0.5'>
										<motion.h2
											initial={{ y: 10, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ delay: 0.15 }}
											className='text-lg'
										>
											{correspondent.profile?.name}
										</motion.h2>

										{correspondent.profile?.job && (
											<motion.p
												className='text-muted-foreground text-xs'
												initial={{ y: 10, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.2 }}
											>
												{typeof correspondent.profile.job === 'string'
													? correspondent.profile.job
													: correspondent.profile.job.name}
											</motion.p>
										)}
									</div>
								</div>

								<div className='border-b border-border px-4 py-4'>
									<motion.div
										initial={{ y: 10, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.25 }}
										className='flex justify-between items-center'
									>
										<span className='flex items-center text-sm text-muted-foreground gap-x-2'>
											<CircleUser size={18} />
											Имя пользователя
										</span>
										<h2>{correspondent?.displayUsername}</h2>
									</motion.div>
								</div>

								<div className='border-b border-border px-4 py-4'>
									{correspondent.profile?.bio && (
										<motion.div
											initial={{ y: 10, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ delay: 0.28 }}
											className=''
										>
											<h4 className='text-sm mb-2 text-muted-foreground'>
												О себе
											</h4>
											<p className='break-words whitespace-pre-wrap'>
												{correspondent.profile.bio}
											</p>
										</motion.div>
									)}
								</div>
								<div className='border-b border-border px-4 py-4'>
									{correspondent?.profile?.skills.length ? (
										<motion.div
											initial={{ y: 10, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ delay: 0.3 }}
										>
											<h4 className='text-sm text-muted-foreground mb-3'>
												Навыки
											</h4>
											<div className='flex flex-wrap gap-3'>
												{correspondent?.profile?.skills?.map(
													(skill: any, i) => (
														<span
															key={i}
															className='bg-primary text-white dark:text-black text-sm px-2.5 py-0.5 rounded-full'
														>
															{typeof skill === 'string' ? skill : skill.name}
														</span>
													)
												)}
											</div>
										</motion.div>
									) : (
										<motion.div
											initial={{ y: 10, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ delay: 0.25 }}
										>
											<h4 className='text-sm mb-2'>Навыки</h4>
											<p className='text-muted-foreground'>Не указано</p>
										</motion.div>
									)}
								</div>
								<div className='border-b border-border px-4 py-4'>
									<motion.div
										initial={{ y: 10, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.3 }}
									>
										<span className='flex items-center text-sm text-muted-foreground gap-x-2'>
											<Info size={18} />
											Дополнительная информация
										</span>
										<div>
											{correspondent?.profile?.languages ? (
												<div>
													<h4 className='text-sm mt-5 mb-2 text-muted-foreground'>
														Языки
													</h4>
													{(correspondent?.profile?.languages || []).map(
														(language: any, i: number, arr) => (
															<span key={i}>
																{typeof language === 'string'
																	? language
																	: language.name}
																{i < arr.length - 1 && ', '}
															</span>
														)
													)}
												</div>
											) : (
												<motion.div
													initial={{ y: 10, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.25 }}
												>
													<h4 className='text-sm mb-2'>Языки</h4>
													<p className='text-muted-foreground'>Не указано</p>
												</motion.div>
											)}
										</div>

										<div>
											{correspondent?.profile?.industries ? (
												<motion.div
													initial={{ y: 10, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.25 }}
												>
													<h4 className='text-sm mt-5 mb-2 text-muted-foreground'>
														Отрасли
													</h4>
													{(correspondent?.profile?.industries || []).map(
														(industry: any, i: number, arr) => (
															<span key={i}>
																{typeof industry === 'string'
																	? industry
																	: industry.name}
																{i < arr.length - 1 && ', '}
															</span>
														)
													)}
												</motion.div>
											) : (
												<motion.div
													initial={{ y: 10, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.25 }}
												>
													<h4 className='text-sm mb-2'>Отрасли</h4>
													<p className='text-muted-foreground'>Не указано</p>
												</motion.div>
											)}
										</div>

										<div>
											{correspondent?.profile?.portfolio?.length ? (
												<motion.div
													initial={{ y: 10, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.25 }}
												>
													<h4 className='text-sm mt-7 mb-2 text-muted-foreground'>
														Портфолио
													</h4>
													{(correspondent?.profile?.portfolio || []).map(
														(link: any, i: number, arr) => (
															<a
																key={i}
																href={link}
																className='mt-1 text-base transition-all duration-500 border-b border-b-foreground dark:hover:border-b-white border-dashed text-foreground hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white'
															>
																{link}
															</a>
														)
													)}
												</motion.div>
											) : (
												<motion.div
													initial={{ y: 10, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													transition={{ delay: 0.25 }}
												>
													<h4 className='text-sm mb-2 mt-7 text-muted-foreground'>
														Портфолио
													</h4>
													<p className='text-muted-foreground'>Не указано</p>
												</motion.div>
											)}
										</div>
									</motion.div>
								</div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</>
	)
}
