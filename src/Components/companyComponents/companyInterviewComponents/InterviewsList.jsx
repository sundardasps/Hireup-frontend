import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, UserIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { scheduleInterviewList } from "../../../Api/companyApi";
import userLogo from "../../../../public/user.png";
import RescheduleInterview from "../companyDialogs/RescheduleInterview";
export default function InterviewsList() {
  const { data } = useQuery({
    queryKey: ["interviewList"],
    queryFn: async () => {
      const response = await scheduleInterviewList();
      return response;
    },
  });

  

  return (
    <>
      <Card className="h-screen w-full shadow border mx-5 my-5 py-4">
        <CardBody className="overflow-y-scroll px-0 h-full">
          <div className="">
            <ul className=" -ml-2 flex flex-col gap-4 items-center">
              {data &&
                data.data.list.map((value, index) => (
                  <MenuItem
                    key={index}
                    className="flex shadow-md border sm:w-full lg:w-[44rem] h-[9rem] text-black rounded-md p-4 "
                  >
                    <div className="flex flex-col sm:flex-row justify-between mx-3">
                      <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                        <Avatar
                          src={value.userDp ? value.userDp : userLogo}
                          alt="Applicant Avatar"
                          className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                        <div className="text-sm border-r-2 p-1 ">
                          <div>
                            Applicant:{" "}
                            <span className="font-bold">{value.userName}</span>{" "}
                          </div>
                          <div>{value.userTitle}</div>
                          <div>Email: {value.userEmail}</div>
                          <div>Number: {value.userNumber}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between ">
                      <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                        <div className="text-sm">
                          <div>Interviewer: {value.interviewer}</div>
                          <div>Date: {value.date}</div>
                          <div>Type: {value.type}</div>
                          {/* Assuming there is a type field */}
                        </div>
                      </div>
                      <div className="flex flex-col mt-2 sm:mt-0">
                        <div className="text-sm border w-[10rem] h-[4rem] rounded-md p-2">
                          <span className="font-bold">Requirements:</span>{" "}
                          {value.requirements}
                        </div>
                      </div>
                    </div>
                    <Menu>
                      <MenuHandler>
                        <EllipsisVerticalIcon className="w-10 h-8 "  />
                      </MenuHandler>
                      <MenuList>
                        <RescheduleInterview details={{value}}/>
                        <MenuItem>Cancel</MenuItem>
                      </MenuList>
                    </Menu>
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
