
import { Button, Card, CardBody, CardFooter, CardHeader, IconButton, Tooltip, Typography } from '@material-tailwind/react'
import { BuildingOffice2Icon } from '@heroicons/react/20/solid'

function  JobCards() {
  return (
<>

            <Card 
          
              className="flex flex-col sm:flex-row justify-between container mx-5 my-5 xl:h-auto xl:w-[30rem] border bg-white shadow-lg rounded-md hover:scale-110 duration-1000"
            >
              <div className="flex flex-col w-full sm:w-auto p-4">
                <Typography color="blue" className="text-3xl font-bold mb-2">
              fsaf
                </Typography>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex items-center gap-2">
                    <BuildingOffice2Icon className="h-6 w-6 text-teal-500" />
                   fs
                    <Typography className="font-bold text-gray-700"></Typography>
                  </div>
                  <div className="flex flex-col mt-2 sm:mt-0">
                    <Typography className="font-semibold text-gray-700">
                      Location:
                    </Typography>
                    <span className="text-gray-500">
                    fsfdds
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 mt-2">
                  Ending date: [dsfsf]
                </div>
              </div>
              <CardFooter className="flex justify-end items-center p-4">
                <Button
                  color="purple"
                  className="hover:bg-purple-700 focus:outline-none focus:border-purple-700"
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
    


</>
  )
}

export default JobCards
