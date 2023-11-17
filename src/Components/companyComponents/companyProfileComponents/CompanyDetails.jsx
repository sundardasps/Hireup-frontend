import {
  MapPinIcon,
  BuildingOffice2Icon,
  CurrencyRupeeIcon,
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
  InboxIcon,
  ClockIcon,
  PlusCircleIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { companyProfile } from "../../../Api/companyApi";
import { useSelector } from "react-redux";

import { jwtDecode } from "jwt-decode";

function CompanyDetails() {
  const token = localStorage.getItem("companyToken");
  const data = jwtDecode(token);
  const navigate = useNavigate();

 
  return (
    <div className=" ">
      <Card className="flex justify-between container mx-2 my-5   bg-gray-100  h-auto border">
        <CardHeader className="flex flex-col sm:flex-row justify-between w-auto   m-4 first-letter rounded">
          <div className="w-80  h-60 sm:h-auto md:w-auto ">
            <img
              src={data.exist.image && data.exist.image }
              alt=""
              className="w-ful h-full object-cover shadow-black shadow-sm rounded"
            />
          </div>

          <div className="mx-2 my-2  container border  rounded-lg p-4">
            <text className="text-4xl text-light-blue-700 font-bold  underline">
              {data.exist.companyName}
            </text>
            <div className="flex flex-col sm:flex-row gap-1 h-auto sm:h-8 m-5">
              <MapPinIcon className="w-5 h-5" />
              <p className="w-full sm:w-1/3 mb-2 sm:mb-0 text-sm">
                location:
                <span className="text-gray-900 font-bold">
                  {data.exist.location}
                </span>
              </p>

              <BuildingOffice2Icon className="w-5 h-5" />
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0 text-sm"
              >
                Comapany Size:{" "}
                <span className="text-gray-900 font-bold">
                  {data.exist.size}
                </span>
              </p>

              <CurrencyRupeeIcon className="w-5 h-5" />
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0 text-sm"
              >
                Gst:
                <span className="text-gray-900 font-bold">
                  {data.exist.gst_number}
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 h-auto sm:h-8 m-5">
              <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0 text-sm"
              >
                Email:
                <span className="text-gray-900 font-bold">
                  {data.exist.email}
                </span>
              </p>
              <PhoneIcon className="w-5 h-5" />
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0 text-sm"
              >
                Mobile:
                <span className="text-gray-900 font-bold">
                  {data.exist.number}
                </span>
              </p>
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              ></p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col sm:flex-row justify-between w-auto h-auto bg-white m-4 first-letter shadow-inner rounded border">
          {data.exist.company_roles}
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
      
             <Button variant="outlined">Edit</Button>
    

        </CardFooter>
      </Card>

     
    </div>
  );
}

export default CompanyDetails;
