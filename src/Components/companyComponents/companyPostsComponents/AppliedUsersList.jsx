import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { jobAppliedUsers, rejectUserApplication } from '../../../Api/companyApi'
import {useNavigate} from 'react-router-dom'
import banner from '../../../../public/banner.webp'
import dp from '../../../../public/user.png'
import toast, { Toaster } from 'react-hot-toast'
import { AppliedUserAction } from '../companyDialogs/AppliedUserAction'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'

function AppliedUsersList() {
  const location = useLocation()
  const jobId = location.state._id
  const navigate = useNavigate()

    const {data,error} = useQuery({
      queryKey:["companyAppliedUsers"],
      queryFn: async () => {
         const response = await jobAppliedUsers(jobId).then((res)=>res.data)
         return response
      }
    }) 

    

     const handlerejectUser = async (userId)=>{
      try {
        const response = await rejectUserApplication(userId,jobId)
      } catch (error) {
        console.log(error);
      }
      }






  return (

        <div className=" justify-between  shadow-xl outline-1  rounded-xl   bg-white border border-black" >
        <div className='text-start border  p-3 w-auto'>
        <Typography variant='h4'>Applicants</Typography>
        </div>
        <CardBody className=" grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-[20rem] ">
          {data && data.usersData.map((value,index)=>(
           <Card key={index} className="max-w-[14rem] mx-auto h-min rounded-lg overflow-hidden shadow bg-white   hover:shadow-lg cursor-pointer border  ">
            <div className="relative border-b-2">
              {/* Background Image */}
              <img
                src={value.userCoverDp?value.userCoverDp:banner}
                alt="Background"
                className="w-[15rem] h-28 object-fil"
              />
              {/* Profile Image */}
              <img
                onClick={()=>navigate(`/company/userProfile`,{state:value._id})}
               src={value.userDp?value.userDp:dp}
                alt="Profile"
                className="rounded-full border-4 border-white absolute -bottom-10 left-14  w-28 h-28 outline-double  object-fill"
              />
            </div>
            <CardBody>
              <div className="my-5 flex items-center justify-center">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-medium"
                >
                 {data?value.userName:""}
                </Typography>
              </div>
              <Typography color="gray" className="text-center uppercase text-xs mb-5 w-auto">
              {data?value.userTitle:""}
              </Typography>
              <div className="flex justify-center gap-2">
                  <Button color='red' size='sm' className='rounded-3xl' onClick={()=>handlerejectUser(value._id)}>
                    Reject
                  </Button>
                 <Button color='green' size='sm' className='rounded-3xl'>
                   Accept
                  </Button>
                {/* <AppliedUserAction  data={{value,jobId}}/> */}
              </div>
            </CardBody>
          </Card> ))
         } 


        </CardBody>
        <div className='flex  justify-end   text-start   p-3 w-auto '>
         <ArrowLeftCircleIcon  className='w-10 h-10 cursor-pointer'/>
         <ArrowRightCircleIcon className='w-10 h-10 cursor-pointer'/>
        </div>
        <Toaster/>
    </div>
  )
}

export default AppliedUsersList