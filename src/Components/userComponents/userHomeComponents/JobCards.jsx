
import { Button, Card, CardBody, CardFooter, CardHeader, IconButton, Tooltip, Typography } from '@material-tailwind/react'
import React from 'react'

function  JobCards() {
  return (
<>

  <Card className="w-full max-w-[29rem] shadow-lg sm:m-10 md:m-5 lg:m-10 border-2 ">
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
          <span>Frontend Engineer</span>
          </Typography>
          <span className="bg-green-500 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl"> Remote </span>

        </div>
        <span>Banglore, India</span>

        <Typography color="gray">
          Enter a freshly updated and thoughtfully furnished peaceful home
          surrounded by ancient trees, stone walls, and open meadows.
        </Typography>
      </CardBody>
      <CardFooter className="pt-3">
        <Button className="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
           Apply
        </Button>
      </CardFooter>
    </Card>
    


</>
  )
}

export default JobCards
