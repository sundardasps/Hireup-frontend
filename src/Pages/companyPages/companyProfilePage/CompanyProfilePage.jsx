
import CompanyDetails from '../../../Components/companyComponents/companyProfileComponents/CompanyDetails'
import CompanySidebar from '../../../Components/companyComponents/companyProfileComponents/CompanySidebar'
function CompanyProfilePage() {
  return (
<div className='flex justify-between m-10 '>
    <CompanyDetails />
    <div className=''>
    <CompanySidebar/>
    </div>
</div>


  )
}

export default CompanyProfilePage