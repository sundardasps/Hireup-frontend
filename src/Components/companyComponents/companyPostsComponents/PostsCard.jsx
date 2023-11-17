import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'
import {BuildingOffice2Icon} from '@heroicons/react/24/solid'
function PostsCard() {
  return (

    <div className=''>
<Card className='flex flex-col sm:flex-row justify-between container mx-5 my-5 xl:h-auto xl:w-[40rem] border bg-white shadow-lg rounded-md'>
  <div className='flex flex-col w-full sm:w-auto p-4'>
    <Typography color='blue' className='text-3xl font-bold mb-2'>
      Junior Frontend Developer
      <hr className="my-1 border-teal-400" />
    </Typography>
    <div className='flex flex-col sm:flex-row justify-between items-start'>
      <div className='flex items-center gap-2'>
        <BuildingOffice2Icon className='h-6 w-6 text-teal-500' />
        <Typography className='font-bold text-gray-700'>
          Tech Emirates
        </Typography>
      </div>
      <div className='flex flex-col mt-2 sm:mt-0'>
        <Typography className='font-semibold text-gray-700'>
          Location:
        </Typography>
        <span className='text-gray-500'>dsgjgfjgdghgh fdsfdsfsdfsffd</span>
      </div>
    </div>
    <div className='text-gray-500 mt-2'>
      Added Date: [Your Date Here]
    </div>
  </div>
  <CardFooter className='flex justify-end items-center p-4'>
    <Button color='purple' className='hover:bg-purple-700 focus:outline-none focus:border-purple-700'>
      Remove
    </Button>
  </CardFooter>
</Card>

    </div>
  )
}

export default PostsCard