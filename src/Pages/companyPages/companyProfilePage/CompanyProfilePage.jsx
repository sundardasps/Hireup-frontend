
import CompanyDetails from '../../../Components/companyComponents/companyProfileComponents/CompanyDetails'
import CompanySidebar from '../../../Components/companyComponents/companyProfileComponents/CompanySidebar'
function CompanyProfilePage() {
  return (
   <div className='flex justify-between '>
    <CompanyDetails />
    <div className='hidden lg:block'>
    <CompanySidebar />
    </div>
    </div>


  )
}

export default CompanyProfilePage