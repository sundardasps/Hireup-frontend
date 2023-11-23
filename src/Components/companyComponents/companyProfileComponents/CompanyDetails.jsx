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
import { BarLoader } from "react-spinners";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";

import { companyProfile } from "../../../Api/companyApi";
import { useQuery } from "@tanstack/react-query";
import { EditProfile } from "../companyDialogs/EditProfile";
import MainLoading from "../../commonComponents/Loadings/MainLoding";
import ProfileImageEdit from "../companyDialogs/ProfileImageEdit";

function CompanyDetails() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["companyProfile"],
    queryFn: async () => {
      const response = await companyProfile().then((res) => res.data);
      return response;
    },
  });

  if (isLoading) {
    return <MainLoading />;
  }

  if (error) {
    return <h1>errorr.....</h1>;
  }

  return (
    <div className=" ">
      <Card className="flex justify-between container mx-2 my-5   bg-white  h-auto border">
        <CardHeader className="flex flex-col sm:flex-row  w-auto   m-4 first-letter rounded">
          
          <div className=" m-2 cursor-pointer" >
          
            <img
              src={data.exist.image ? data.exist.image : ""}
              alt=""
              className="w-full h-full object-cover rounded"
              style={{ width: "80%", height: "80%" }}
            />
            <ProfileImageEdit datas={{image:data.exist.image,size:"xs"}}/>
          </div>

          <div className="mx-2 my-2  container border  rounded-lg p-4">
            <text className="text-4xl text-light-blue-700 font-bold  underline">
              {data.exist.companyName}
            </text>
            <div className="flex flex-col sm:flex-row gap-1 h-auto sm:h-8 m-5">
              <MapPinIcon className="w-5 h-5" />
              <text className="w-full sm:w-1/3 mb-2 sm:mb-0 text-sm">
                location:
                <span className="text-gray-900 font-bold">
                  {data.exist.location}
                </span>
              </text>

              <BuildingOffice2Icon className="w-5 h-5" />
              <text
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0 text-sm"
              >
                Comapany Size:{" "}
                <span className="text-gray-900 font-bold">
                  {data.exist.size}
                </span>
              </text>

              <CurrencyRupeeIcon className="w-5 h-5" />
              <text
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0 text-sm"
              >
                Gst:
                <span className="text-gray-900 font-bold">
                  {data.exist.gst_number}
                </span>
              </text>
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
            <div className="flex flex-col sm:flex-row gap-2 h-auto sm:h-8 m-5">
              <PhoneIcon className="w-5 h-5" />
              <p
                type="text"
                placeholder="Input 4"
                className="w-full  mb-2 sm:mb-0 text-sm"
              >
                Address: {""}
                <span className="text-gray-900 font-bold">
                  {data.exist.address}
                </span>
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col sm:flex-row justify-between w-auto h-auto bg-white m-4 first-letter shadow-inner rounded border">
          {data.exist.company_roles}
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <EditProfile
            data={{
              companyName: data.exist.companyName,
              location: data.exist.location,
              size: data.exist.size,
              gstNumber: data.exist.gst_number,
              email: data.exist.email,
              number: data.exist.number,
              roles: data.exist.company_roles,
              address: data.exist.address,
            }}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default CompanyDetails;
