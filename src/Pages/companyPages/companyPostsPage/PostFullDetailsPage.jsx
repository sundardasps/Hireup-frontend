
import PostFullDetails from '../../../Components/companyComponents/companyPostsComponents/PostFullDetails'
import CompanySidebar from '../../../Components/companyComponents/companyProfileComponents/CompanySidebar'

function PostFullDetailsPage() {

    return (
        <div className='flex justify-between m-10 '>
          <PostFullDetails/>
          <div className='hidden lg:block'>
          <CompanySidebar/>
          </div>
      </div>
        )
      }
      

export default PostFullDetailsPage