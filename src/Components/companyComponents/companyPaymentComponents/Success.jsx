import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/solid';
export default function Success() {

  const navigate = useNavigate()
  const location = useLocation()
  const {amount}   = location.state

  
  return (
   <div className='mt-5'>
       <div className="flex justify-center   gap-5">
           <Card
            color="blue"
            variant="gradient"
            className="w-full max-w-[30rem] h-[20rem] p-5 border "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0  rounded-none border-b border-white/10 pb-4 text-center"
            >
           <Typography  variant='h3' color='white'>Payment Completed</Typography>
            </CardHeader>
            <CardBody className="p-0 m-0  rounded-none border-b border-white/10 pb-4 text-center">
            <Typography
                variant="small"
                color="white"
                className="font-normal uppercase"
              >
                basic
              </Typography>
              <Typography
                variant="h1"
                color="white"
                className="mt-1 flex justify-center gap-1 text-7xl font-normal"
              >
                <span className="mt-1 text-xs">₹</span>{amount?amount:""}{" "}
              </Typography>
            </CardBody>
            <CardFooter className='flex justify-center'>
              <Button onClick={()=>navigate("/company/posts")}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        </div>
   </div>
  )
}
