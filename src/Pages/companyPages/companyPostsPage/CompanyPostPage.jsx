import React from 'react'
import CompanySidebar from '../../../Components/companyComponents/companyProfileComponents/CompanySidebar'
import PostsCard from '../../../Components/companyComponents/companyPostsComponents/PostsCard'

function CompanyPostPage() {
  return (
  <div className='flex justify-between'>
    <div className=''>
    <PostsCard/>
    </div>
    <CompanySidebar/>
</div>
  )
}

export default CompanyPostPage