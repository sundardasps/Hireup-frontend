import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useQuery } from '@tanstack/react-query'
import { scheduleInterviewList } from "../../../Api/companyApi";
export default function InterviewsList() {

  
  const {data} = useQuery({
     queryKey:["interviewList"],
     queryFn: async () =>{
        const response = await scheduleInterviewList()
        return response
     }
  })

  console.log(data,"===============================================");

  return (
    <>
      <Card className="h-screen w-full border-2 border-black mx-5 my-5 ">
        <CardBody className="overflow-scroll px-0 h-full">
          <div className="">
            <ul className=" -ml-2 flex flex-col gap-1 items-center">
              {data&&data.data.list.map((value,index)=>(
              <MenuItem key={index} className="flex items-center justify-center gap-3 py-4 px-6 shadow-md w-[45rem] h-[7rem]  text-white rounded-md">
                <Typography
                  className="uppercase"
                  color="blue-gray"
                  variant="h6"
                >
                Interviewer : {value.interviewer} {""},
                date:{value.date},
                Type:{value.type}
                </Typography>
                <Typography>
                  Requirements:{value.requirements}
                </Typography>
              </MenuItem>
              ))}

            </ul>
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {/* Page {page} of {data.totalPage} */}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              //   disabled={page === 1}
              //   onClick={() => handlePage(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              //   onClick={() => handlePage(page + 1)}
              //   disabled={page === data.data.totalPage}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
