
import PostFullDetails from '../../../Components/companyComponents/companyPostsComponents/PostFullDetails'
import CompanySidebar from '../../../Components/companyComponents/companyProfileComponents/CompanySidebar'

function PostFullDetailsPage() {

    return (
        <div className='flex justify-between m-10 '>
          <div className=''>
          <PostFullDetails/>
          </div>
          <CompanySidebar/>
      </div>
        )
      }
      

export default PostFullDetailsPage