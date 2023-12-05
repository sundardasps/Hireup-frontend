import React from 'react'
import AppliedUsersList from '../../../Components/companyComponents/companyPostsComponents/AppliedUsersList'
import CompanySidebar from '../../../Components/companyComponents/companyProfileComponents/CompanySidebar'
function AppliedUsersPage() {
  return (
    <div className='flex h-screen m-5'>
         <div className='w-screen'>
         <AppliedUsersList/>
         </div>
         <CompanySidebar/>
    </div>
  )
}

export default AppliedUsersPage