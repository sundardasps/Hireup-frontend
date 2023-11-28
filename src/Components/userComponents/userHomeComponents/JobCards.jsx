import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Input,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { BuildingOffice2Icon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { categoryDataForUser, getAllJobs } from "../../../Api/userApi";
import { CheckCircleIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { JobFullDetails } from "./JobFullDetails";
import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

function JobCards() {
  const [open, setOpen] = React.useState(0);
  const [category, setCategory] = React.useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState();
  const [selectedJob, setSelectedJob] = useState(null);
  const [debounsedSearch, setDebouncedSearch] = useState("");
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
  //-----------------------------------------------------//

  if (isLoading) {
    return <h1>loadiii</h1>;
  }

  if (error) {
    return <h1>errorr</h1>;
  }

  return (
    <div className="flex">
      <div>
        <Card className="h-auto w-full max-w-[17rem] p-1 shadow-xl shadow-blue  border m-5">
          <div className="mb-1 p-2">
            <Typography variant="h3" color="blue-gray">
              Find jobs..
            </Typography>
            <div className="w-full ">
              <Input
                label="Search"
                autoFocus
                value={search}
                onChange={handleSearch}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
          <List>
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
                          className="font-medium"
                        >
                          {value}
                        </ListItem>
                      </List>
                    ))}
                  </AccordionBody>
                </Accordion>
              ))}
          </List>
          <List>
           
          </List>
        </Card>
      </div>

      <div className="">
        {data &&
          data.data &&
          data.data.map((data, index) => (
            <Card
              key={index}
              className="flex  sm:flex-row justify-between container m-5  h-min xl:w-[30rem] border bg-white shadow-lg rounded-md hover:shadow-xl "
            >
              <div className="flex flex-col w-full sm:w-auto m-5">
                <div className="flex flew-row  ">
                  <img
                    src={data.companyImage}
                    style={{ width: "50px", height: "50px" }}
                    className="rounded-sm"
                  />
                  <Typography color="blue" className="text-1xl font-bold mx-5">
                    {data.job_title}
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex justify-center gap-2 mt-2">
                    <BuildingOffice2Icon className="h-5 w-5 text-teal-500" />
                    <Typography className="font-light text-gray-700">
                      {data.companyLocation},({data.job_type})
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
                      <CheckCircleIcon className="w-5 h-5 mt-1" /> Actively
                      hiring
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    className="mt-2 cursor-pointer font-light hover:underline "
                    style={{ userSelect: "none" }}
                    onClick={() => handleShowDetails(data)}
                  >
                    Show details
                  </div>
                </div>
              </div>
              <CardFooter className=" ">
                <BookmarkIcon className="w-5 h-5  cursor-pointer " />
              </CardFooter>
            </Card>
          ))}
      </div>

      <div className="">
        {selectedJob && (
          <div className=" m-5">
            <JobFullDetails
              jobdata={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default JobCards;
