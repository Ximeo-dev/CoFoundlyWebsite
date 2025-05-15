'use client'

import { IProject } from '@/types/project.types'
import ProjectCardHeader from './project-card-header'
import ProjectCardSidebar from './sidebar/project-card-sidebar'
import { useState } from 'react'

interface IProjectCardView {
  project: IProject | any
}

export default function ProjectCardView({ project }: IProjectCardView) {
  if (!project) {
    return <p>Проект не найден</p>
  }
  const [activeTab, setActiveTab] = useState<'participants' | 'settings'>(
		'participants'
	)
  
	return (
		<div className='h-[500px]'>
			<ProjectCardHeader project={project} />
      <div className='grid' style={{
        gridTemplateColumns: '0.45fr 1fr'
      }}>
        <ProjectCardSidebar onTabChange={setActiveTab} />
        {activeTab === 'participants' && <p>participants</p>}
        {activeTab === 'settings' && <p>settings</p>}
      </div>
		</div>
	)
}