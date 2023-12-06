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
    <>
      <Card className="flex justify-between container mx-2 my-2   bg-white  h-auto  ">
        <CardHeader className="flex flex-col sm:flex-row w-auto m-4 first-letter rounded shadow">
          <div className=" m-2 cursor-pointer">
            <img
              src={data.exist.image ? data.exist.image : ""}
              alt=""
              className="max-h-44 w-full object-cover rounded sm:w-60"
            />
            <ProfileImageEdit datas={{ image: data.exist.image, size: "xs" }} />
          </div>

          <div className=" w-auto rounded-lg">
            <div className=" mb-4 sm:mb-0">
              <text className="text-4xl text-light-blue-700 font-bold underline m-1">
                {data.exist.companyName}
              </text>
            </div>

            <div className="ml-5">
              <div className="flex gap-2 w-auto my-2">
                <MapPinIcon className="w-5 h-5" />
                <div className="flex flex-col">
                  <text className="mb-2 text-sm">
                    location: {""}
                    <span className="text-gray-900 font-semibold w-auto">
                      {data.exist.location}
                    </span>
                  </text>
                </div>
              </div>
              
              <div className="flex gap-2 w-auto my-2">
                <BuildingOffice2Icon className="w-5 h-5" />
                <div className="flex flex-col">
                  <text className="mb-2 text-sm">
                  Comapany Size:{" "}
                  <span className="text-gray-900 font-semibold w-auto">
                    {data.exist.size}
                  </span>
                  </text>
                </div>
              </div>
             
              <div className="flex gap-2 w-auto my-2">
                <CurrencyRupeeIcon className="w-5 h-5" />
                <div className="flex flex-col">
                  <text className="mb-2 text-sm">
                  Gst: {""}
                  <span className="text-gray-900 font-semibold w-auto">
                    {data.exist.gst_number}
                  </span>
                  </text>
                </div>
              </div>
              
              <div className="flex gap-2 w-auto my-2">
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                <div className="flex flex-col">
                  <text className="mb-2 text-sm">
                  Email: {""}
                  <span className="text-gray-900 font-semibold w-auto">
                    {data.exist.email}
                  </span>
                  </text>
                </div>
              </div>

              <div className="flex gap-2 w-auto my-2">
                <PhoneIcon className="w-5 h-5" />
                <div className="flex flex-col">
                  <text className="mb-2 text-sm">
                  Mobile: {""}
                  <span className="text-gray-900 font-semibold w-auto">
                    {data.exist.number}
                  </span>
                  </text>
                </div>
              </div>

              <div className="flex gap-2 w-auto my-2">
                <PhoneIcon className="w-5 h-5" />
                <div className="flex flex-col">
                  <text className="mb-2 text-sm">
                  Address: {""}
                  <span className="text-gray-900 font-semibold w-auto">
                    {data.exist.address}
                  </span>
                  </text>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody className="flex flex-col sm:flex-row justify-between  h-auto bg-white m-4 first-letter shadow-inner rounded border w-11/12">
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
    </>
  );
}

export default CompanyDetails;
