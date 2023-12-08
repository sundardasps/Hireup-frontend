import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  Card,
  CardFooter,
  Input,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import { BuildingOffice2Icon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { categoryDataForUser, getAllJobs } from "../../../Api/userApi";
import {
  CheckCircleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { JobFullDetails } from "./JobFullDetails";
import React, { useEffect, useState } from "react";
import {
  BookmarkSlashIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import MainLoading from "../../commonComponents/Loadings/MainLoding";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultDp from '../../../../public/user.png'

function JobCards() {
  const [open, setOpen] = React.useState(0);
  const [category, setCategory] = React.useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState();
  const [selectedJob, setSelectedJob] = useState(null);
  const [debounsedSearch, setDebouncedSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state)=>{
    return state.user
  })  

  //----------------------------------------Side bar data fetch----------------------------------------//

  useEffect(() => {
    const fetchCategory = async () => {
      await categoryDataForUser().then((res) => setCategory(res.data.data));
    };

    fetchCategory();
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [search]);

  //----------------------------------------Jobcard data fetch----------------------------------------//

  const { data, isLoading, error } = useQuery({
    queryKey: ["userHome", { filter, search: debounsedSearch }],
    queryFn: async () => {
      const response = await getAllJobs({
        search: debounsedSearch,
        filter,
      }).then((res) => res.data);

      return response;
    },
  });

  //-----------------------------------------------------//

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  //-----------------------------------------------------//

  const handleSearch = async (event) => {
    setSearch(event.target.value);
  };
  //-----------------------------------------------------//

  const handleFilter = (e) => {
    const selectedValue = e.target.innerText;
    setFilter(selectedValue);
  };
  //-----------------------------------------------------//

  const handleShowDetails = (jobData) => {
    setSelectedJob(jobData);
  };

  if (isLoading || !selectedJob) {
    if (data && data.data && data.data.length > 0 && !selectedJob) {
      setSelectedJob(data.data[0]);
    }
    return <MainLoading />;
  }

  return (
    <div className="flex justify-center  ">
      <div className="">
        <Card className="fixed h-auto w-full max-w-[17rem] p-1 shadow-xl shadow-blue  border m-5  hidden lg:block">
          <div className="grid justify-center  m-3 border-b-2 p-2">
           <div className="flex justify-center mb-2 ">
            <Avatar src={user.userDp ? user.userDp : defaultDp } className=" shadow-sm shadow-black cursor-pointer " alt="avatar" size="lg" onClick={() => navigate("/user/profile")} />
           </div>
          <Typography className="text-center font-bold"  variant="lead">
             {user.userName}
          </Typography>
          <Typography className="text-center" variant="small">
             {user.userTitle}
          </Typography>
          </div>
          <div className="mb-1 p-1">
            {/* <Typography variant="h3" color="blue-gray">
              Find jobs..
            </Typography> */}
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
          <div className="p-1">
            <Button onClick={()=>location.reload()} size="sm" variant="outlined" fullWidth> 
              Clear
            </Button>
          </div>
          <List className="overflow-y-scroll h-40 ">
            {category &&
              category.map((value, index) => (
                <Accordion
                  key={index}
                  open={open === index + 1}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === index + 1 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem
                    className="p-1 hover:bg-gray-200 border "
                    selected={open === index + 1}
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(index + 1)}
                      className="border-b-0 p-0"
                    >
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-small"
                      >
                        {value.title}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                   <AccordionBody className="py-1">
                    {value.category.map((value, index) => (
                      <List key={index}>
                        <ListItem
                          key={index}
                          onClick={handleFilter}
                          className="border-b-0 p-0"
                        >
                          {value}
                        </ListItem>
                      </List>
                    ))}
                  </AccordionBody>
                </Accordion>
              ))}
          </List>
          <List></List>
        </Card>
      </div>

      <div className=" mx-auto ">
        {data &&
          data.data &&
          data.data.map((data, index) => (
            <Card
              key={index}
              className=" flex  sm:flex-row justify-between container my-5   xl:w-[30rem] border bg-white  rounded-md hover:shadow-xl  "
            >
              <div className="m-2 mt-4 w-auto h-auto">
                <img
                  src={data.companyImage}
                  style={{ width: "80px", height: "50px" }}
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-col  w-full  m-5">
                <div className="">
                  <Typography color="blue" className="text-lg font-bold ">
                    {data.job_title}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  <BuildingOffice2Icon className="h-4 w-4 text-teal-500" />
                  <Typography className="text-sm">
                    {data.companyName}
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex justify-center gap-2 ">
                    <Typography className="font-serift text-sm text-gray-600">
                      {data.companyLocation}({data.job_type})
                    </Typography>
                  </div>
                  <div className="flex flex-col mt-2 sm:mt-0">
                    <Typography className="font-semibold text-gray-700"></Typography>
                    <span className="text-gray-500"></span>
                  </div>
                </div>
                <div className="flex justify-between">
                  {data.is_active ? (
                    <div className=" flex text-green-400 mt-2 font-normal ">
                      <CheckCircleIcon className="w-5 h-5 mt-1 " /> Actively
                      recruiting
                    </div>
                  ) : (
                    <div className=" flex  mt-2 font-normal ">
                    </div>
                  )}
                  <div
                    className="mt-2 cursor-pointer font-light hover:underline left-0 "
                    style={{ userSelect: "none" }}
                    onClick={() => handleShowDetails(data)}
                  >
                    <span> Show details</span>
                  </div>
                </div>
              </div>
              <CardFooter className=" ">
                <BookmarkIcon className="w-5 h-5  cursor-pointer  underline" />
                <BookmarkSlashIcon className="w-5 h-5  cursor-pointer  underline" />
              </CardFooter>
            </Card>
          ))}
      </div>

      <div className="  m-5  hidden lg:block ">
        {selectedJob && (
          <JobFullDetails
            jobdata={selectedJob}
          />
        )}
      </div>
    </div>
  );
}




export default JobCards;
