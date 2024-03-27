import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { appliedList } from "../../../Api/userApi";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  CardFooter,
  Input,
  List,
  ListItem,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import DefaultImg from "../../../../public/istockphoto-1454186576-612x612.jpg";
import { JobFullDetails } from "./JobFullDetails";
import { useNavigate } from "react-router-dom";
function AppliedList() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [debounsedSearch, setDebouncedSearch] = useState("");
  const [open, setOpen] = React.useState(0);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleShowDetails = (jobData) => {
    setSelectedJob(jobData);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    console.log(filter);
    return () => clearTimeout(timeoutId);
  }, [search, filter]);

  //-----------------------------------------------------//

  const handleSearch = async (event) => {
    setSearch(event.target.value);
  };

  //-----------------------------------------------------//

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["userApplied", { filter, search: debounsedSearch }],
    queryFn: async () => {
      const response = await appliedList({
        filter,
        search: debounsedSearch,
      }).then((res) => res.data);
      return response;
    },
  });

  return (
    <div className="flex  container  mt-5 m-auto  h-screen">
      <div className="">
        <Card className=" h-auto w-full max-w-[15rem] p-1 shadow-xl shadow-blue  border ml-5   hidden lg:block">
          <div className="mb-1 p-2">
            <Typography variant="h3" color="blue-gray">
              Applied jobs
            </Typography>
            <div className="w-full ">
              <Input
                label="Search ..."
                // placeholder="Seach job,company,place,skill.."
                autoFocus
                value={search}
                onChange={handleSearch}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
          <div className="w-auto m-2">
            <Select label="Filter" onChange={(value) => setFilter(value)}>
              <Option key={"pre"} value="previous">
                Most previous{" "}
              </Option>
              <Option key={"old"} value="old">
                Most oldest{" "}
              </Option>
            </Select>
          </div>
          <div className="p-3">
            <Button
              onClick={() => location.reload()}
              size="sm"
              variant="outlined"
              fullWidth
            >
              Clear
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid  mx-auto  lg:grid-cols-2 md:px-6 lg:grid-rows-4  scollable ">
        
        {data && data.appliedJobData && data.appliedJobData.length > 0 ? (
          data.appliedJobData.map((data, index) => (

            <Card
              key={index}
              onClick={(e) => { 
                e.stopPropagation(),
                  navigate("/user/jobDetails", {
                    state: { jobId: data._id },
                  });
              }}
              className={`flex flex-row justify-between container mb-5 cursor-pointer border hover:border-blue-600 bg-white  rounded-md hover:shadow-xl  w-[19.4rem]   h-[7rem]  md:mx-10  md:w-[25rem]   xl:w-[35rem]${
                selectedJob?._id === data?._id && "bg-blue-gray-50"
              } `}
            >
              <div className="mx-3 mt-3 w-auto h-auto">
                <img
                  src={data.companyImage?data.companyImage:DefaultImg}
                  style={{ width: "80px", height: "50px" }}
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-col   w-full   my-2">
                <div className="">
                  <Typography
                    color="blue"
                    className="text-xs font-bold   md:text-base "
                  >
                    {data.job_title}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  <BuildingOffice2Icon className="h-4 w-4 text-teal-500" />
                  <Typography className="text-xs md:text-xs">
                    {data.companyName}
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex justify-center gap-2 ">
                    <Typography className="font-serift text-xs text-gray-600 md:text-xs">
                      {data.companyLocation}({data.job_type})
                    </Typography>
                  </div>
                  <div className="flex justify-between ">
                    <Typography className="font-semibold text-gray-700"></Typography>
                    <span className="text-gray-500"></span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div
                    className={`flex ${
                      data.is_active ? " text-green-400" : " text-white"
                    }  my-3  font-normal text-xs `}
                  >
                    <CheckCircleIcon className="w-4 h-4 " /> Actively recruiting
                  </div>
                   <div
                      className="m-3  cursor-pointer  font-light hover:underline  text-xs  "
                      style={{ userSelect: "none" }}
                      onClick={(e) => {
                        e.stopPropagation(), handleShowDetails(data);
                      }}
                    >
                      <span className=" sm:block hidden "> Show details</span>
                    </div>
                </div>
              </div>
            </Card>
            
          )
          )
          
        ) : (
          <Typography className="text-center text-gray-600 my-5">
            No applied jobs found.
          </Typography>
        )}
      </div>

    </div>
  );
}

export default AppliedList;
