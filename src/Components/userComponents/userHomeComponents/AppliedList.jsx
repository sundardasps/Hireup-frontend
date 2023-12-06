import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { appliedList } from '../../../Api/userApi'
import { Accordion, AccordionBody, AccordionHeader, Button, Card, CardFooter, Input, List, ListItem, Option, Select, Typography } from '@material-tailwind/react'
import { BookmarkIcon, BookmarkSlashIcon, BuildingOffice2Icon, CheckCircleIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function AppliedList() {
  const [category, setCategory] = React.useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [debounsedSearch, setDebouncedSearch] = useState("");
  const [open, setOpen] = React.useState(0);
  

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

   console.log(data,"====================");
 

  return (
    <div className="flex justify-center  ">
      <div className="">
      <Card className="fixed h-auto w-full max-w-[17rem] p-1 shadow-xl shadow-blue  border m-5  hidden lg:block">
          <div className="mb-1 p-2">
            <Typography variant="h3" color="blue-gray">
              Find jobs..
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
          data.appliedJobData.map((data, index) => (
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
                    // onClick={() => handleShowDetails(data)}
                  >
                    <span> Show details</span>
                  </div>
                </div>
              </div>
              {/* <CardFooter className=" ">
                <BookmarkIcon className="w-5 h-5  cursor-pointer  underline" />
                <BookmarkSlashIcon className="w-5 h-5  cursor-pointer  underline" />
              </CardFooter> */}
            </Card>
          ))}
      </div>
    </div>
    

  )
}

export default AppliedList