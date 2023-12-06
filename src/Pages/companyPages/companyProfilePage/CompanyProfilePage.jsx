
import CompanyDetails from '../../../Components/companyComponents/companyProfileComponents/CompanyDetails'
import CompanySidebar from '../../../Components/companyComponents/companyProfileComponents/CompanySidebar'
function CompanyProfilePage() {
  return (
   <div className='flex justify-between '>
    <CompanyDetails />
    <CompanySidebar/>
    </div>


  )
}

export default CompanyProfilePage