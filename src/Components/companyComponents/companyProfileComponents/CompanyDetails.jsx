import { BuildingOffice2Icon} from "@heroicons/react/24/solid";
import photo from "../../../../public/employee.jpeg";
import {useNavigate,useParams} from 'react-router-dom'
import {
  useQuery
} from '@tanstack/react-query'
import {
  Button,

  Card,
  CardBody,
  CardFooter,
  CardHeader,

} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { companyProfile } from "../../../Api/companyApi";
import { useSelector } from "react-redux";




import {jwtDecode} from 'jwt-decode' 





function CompanyDetails() {
   const token= localStorage.getItem('companyToken')
const data = jwtDecode(token)
  const navigate = useNavigate()

  return (
    <div className="flex justify-center gap-10 ">
      <Card className="flex justify-between container mx-2 my-5  sm:w-80 bg-gray-100 md:w-2/3 lg:w-2/3 xl:w-2/3 h-auto border">
        <CardHeader className="flex flex-col sm:flex-row justify-between w-auto   m-4 first-letter rounded">
          <div className=" w-full sm:w-40 h-60 sm:h-auto ">
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover shadow-black  shadow-sm rounded"
            />
          </div>
          <div className="mx-2 my-2  container border  rounded-lg p-4">
            <text className="text-4xl text-light-blue-700 font-bold  underline">
            {data.exist.companyName}
            </text>
            <div className="flex flex-col sm:flex-row gap-4 h-auto sm:h-8 m-5">
              <p className="w-full sm:w-1/3 mb-2 sm:mb-0">location:</p>

              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Size: 
              </p>

              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Gst:
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 h-auto sm:h-8 m-5">
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Email: {data.exist.email}
              </p>
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Mobile: {data.exist.number}
              </p>
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              ></p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col sm:flex-row justify-between w-auto h-auto bg-white m-4 first-letter shadow-inner rounded border"></CardBody>
        <CardFooter className="flex justify-end">
          <Button variant="outlined">Edit</Button>
        </CardFooter>
      </Card>

       {/* <Card className="flex container mx-5 my-5  sm:w-50 bg-gray-100 md:w-1/5 lg:w-1/5 xl:w-1/5 h border" >
       <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
        <hr className="my-2 border-blue-gray-50" />
      </div>
      <List>

        <ListItem onClick={() => alert() }>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Posts
          <ListItemSuffix>
          
          </ListItemSuffix>
        </ListItem>
        <ListItem
          onClick={() => {
            alert()
           
          }}
        >
          <ListItemPrefix>
            <BuildingOffice2Icon className="h-5 w-5" />
          </ListItemPrefix>
          Companies
        </ListItem>
        <ListItem
          onClick={() => {
           alert()
            
          }}
        >

        </ListItem>

      </List>
      </Card> */}
    </div>
  );
}

export default CompanyDetails;
