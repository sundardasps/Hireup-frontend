import React from 'react'
import InterviewListComponent from '../../../Components/companyComponents/companyInterviewComponents/InterviewsList'
import CompanySidebar from '../../../Components/companyComponents/companyProfileComponents/CompanySidebar'
export default function InterviewList() {
  return (
    <div className='flex'> 
         <InterviewListComponent/>
         <CompanySidebar/>
    </div>
  )
}
