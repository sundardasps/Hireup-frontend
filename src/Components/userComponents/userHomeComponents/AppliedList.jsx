import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { appliedList } from '../../../Api/userApi'
import { Accordion, AccordionBody, AccordionHeader, Button, Card, CardFooter, Input, List, ListItem, Option, Select, Typography } from '@material-tailwind/react'
import { BookmarkIcon, BookmarkSlashIcon, BuildingOffice2Icon, CheckCircleIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import  AppliedJobStatus from '../userDialogs/AppliedJobStatus' 
import { JobFullDetails } from './JobFullDetails';
function AppliedList() {
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
  }, [search,filter]);


  //-----------------------------------------------------//

  const handleSearch = async (event) => {
    setSearch(event.target.value);
  };

  //-----------------------------------------------------//

    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };

   const {data,error,isLoading} = useQuery({
     queryKey:["userApplied",{filter,search:debounsedSearch}],
     queryFn: async ()=>{
      const response = await appliedList({filter,search:debounsedSearch}).then((res)=>res.data)
      return response
     }
   })


 

  return (
    <div className="flex justify-center  ">
      <div className="">
      <Card className="fixed h-auto w-full max-w-[17rem] p-1 shadow-xl shadow-blue  border m-5  hidden lg:block">
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
          <Select label="Filter" onChange={(value)=>setFilter(value)}>
          <Option key={"pre"} value='previous'>Most previous </Option>
          <Option key={"old"} value='old'>Most oldest </Option>
          </Select>
          </div>
          <div className="p-3">
            <Button onClick={()=>location.reload()} size="sm" variant="outlined" fullWidth> 
              Clear
            </Button>
          </div>
    
        </Card>
      </div>

        
        <div className=" mx-auto ">
        {data &&
          data.appliedJobData &&
          data.appliedJobData.length > 0 ? (
          data.appliedJobData.map((data, index) => (
            <Card
              key={index}
              onClick={(e) => {
                e.stopPropagation(), handleShowDetails(data);
              }}
              className={`flex flex-row justify-between container my-5 cursor-pointer  border bg-white  rounded-md hover:shadow-xl custom-sm sm:w-[25rem]  sm:ml-10  md:w-[25rem] md:h-[8rem]  xl:w-[30rem] ${
                selectedJob?._id === data?._id && "bg-blue-gray-50"
              } `}
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
                    className=" cursor-pointer font-light hover:text-blue-500 left-0 "
                    style={{ userSelect: "none" }}
                    // onClick={() => handleShowDetails(data)}
                  >
                     <AppliedJobStatus jobData={data}/>

                  </div>
                  
                </div>
                
                
              </div>
              
            </Card>
            
          )
          
          
          )):<Typography className="text-center text-gray-600 my-5">
          No applied jobs found.
        </Typography>
        }
      </div>
      <div className="  m-5  hidden lg:block hidden-lg-at-1024 ">
               {selectedJob && <JobFullDetails jobdata={selectedJob} />}
                </div>
    </div>
    

  )
}

export default AppliedList