import {EllipsisVerticalIcon, BuildingOffice2Icon,CalendarDaysIcon, ChatBubbleBottomCenterTextIcon,ComputerDesktopIcon,ShoppingBagIcon, CurrencyRupeeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, CardHeader, Menu, MenuHandler, MenuItem, MenuList, Option, Select, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import {useQuery} from '@tanstack/react-query'
import { postDetails } from '../../../Api/companyApi';
function PostFullDetails() {
  const location = useLocation()
  const jobId = location.state._id
 

  const {data,isLoading,error} = useQuery({
     queryKey:["jobDetails",jobId],
     queryFn: async ()=>{
      const response = await postDetails(jobId);
      return response.data;
     }
  })
  
  console.log(data);
if (isLoading) {
  <div>dsjsghfdhjgfhjdgs</div>
}
if (error) {
  <div>dsjsghfdhjgfhjdgs</div>
}

  return (
    <div> 
      <Card className="  container mx-2 my-5   bg-white  h-auto border">
        <div className='flex  flex-col  '> 
        <text className="flex justify-between text-4xl text-light-blue-700 font-bold  underline m-5">
          {data ? data.jobDetails.job_title : ""}
          <div>
            <EllipsisVerticalIcon className='w-8 h-8 cursor-pointer ' />
          
           
             
          </div>
          
        </text>
        </div>

        <div className='flex flex-col gap-3 m-5 '>

          <text className='flex '>
          <ShoppingBagIcon className='w-5 h-5 mx-1'/>
          {data ? data.jobDetails.job_type : ""}
          </text>
          <text className='flex '>
          <ComputerDesktopIcon className='w-5 h-5 mx-1'/>
          {data ? data.jobDetails.experience : ""} year experience needed
          </text>
          <text className='flex '>
          <CurrencyRupeeIcon className='w-5 h-5 mx-1'/>
          Salary : {''}
          {data ? data.jobDetails.salery : ""} /-
          </text>
          <text className='flex '>
          <CalendarDaysIcon className='w-5 h-5 mx-1'/>
          Application will closes on {''}
          {data ? data.jobDetails. end_time : ""} 
          </text>
        </div>
     
        
        <div className='mx-4'><p>Skills required</p></div>
    <CardBody className="flex flex-col sm:flex-row justify-between w-auto h-auto bg-white m-2 first-letter shadow-inner rounded border">
    {data ? data.jobDetails.required_skills : ""}
    </CardBody>
     <div className='mx-4'><p>Responsibilities</p></div>
    <CardBody className="flex flex-col sm:flex-row justify-between w-auto h-auto bg-white m-2 first-letter shadow-inner rounded border">
    {data ? data.jobDetails.responsibilities  : ""}
    </CardBody>
    <CardFooter className="flex justify-end gap-2">
      
          <Button variant="outlined">Edit</Button>


    </CardFooter>
  </Card></div>
  )
}

export default PostFullDetails