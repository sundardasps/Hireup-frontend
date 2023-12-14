import React from 'react'
import  { PriceCards } from '../../../Components/companyComponents/companyPaymentComponents/PriceCards'
import PaymentStatus from '../../../Components/companyComponents/companyPaymentComponents/PaymentStatus'
export default function CompanyPayment() {
  return (
    <div className='bg-blue-600'>
     <PaymentStatus/>
      <PriceCards/>
    </div>
  )
}
