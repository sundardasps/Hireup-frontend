import {
  Button,
  Card,
  CardFooter,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  BuildingOffice2Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { companyPosts } from "../../../Api/companyApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {useNavigate} from "react-router-dom"
function PostsCard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate()
  const [debounsedSearch, setDebouncedSearch] = useState("");
  const TABS = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Expired",
      value: "Expired",
    },
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(timeoutId);
  },);

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", { page: page, filter, search: debounsedSearch }],
    queryFn: () =>
      companyPosts({ page: page, filter, search: debounsedSearch }).then(
        (res) => res.data
       
      ),
      
  },);



  const handlePage = async (newPage) => {
    if (newPage < 1 || newPage > data.totalPage) {
      return;
    }
    setPage(newPage);
  };

  return (
    <div>  
         <div className="flex gap-4 md:flex-row mt-5">
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader >
            {TABS.map(({ label, value }) => (
              <Tab onClick={() => setFilter(value)} key={value} value={value}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            label="Search title"
            value={search}
            autoFocus
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
     <div className="flex flex-col items-center ">
 

      {data &&
        data.data &&
        data.data.map(({ _id, job_title, end_time, job_type, required_skills }) => {
          return (
            <Card onClick={()=>navigate(`/company/post/details`,{state : {_id}})}
              key={job_title}
              className="flex  sm:flex-row justify-between container m-5  h-min xl:w-[30rem] border bg-white shadow-lg rounded-md hover:scale-105 duration-500"
            >
              <div className="flex flex-col w-full sm:w-auto p-4">
                <Typography color="blue" className="text-1xl font-bold mx-5">
                  {job_title}
                </Typography>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex items-center gap-2">
                    <BuildingOffice2Icon className="h-6 w-6 text-teal-500" />
                    {data.companyData.companyName}
                    <Typography className="font-bold text-gray-700"></Typography>
                  </div>
                  <div className="flex flex-col mt-2 sm:mt-0">
                    <Typography className="font-semibold text-gray-700">
                      Location:
                    </Typography>
                    <span className="text-gray-500">
                    {data.companyData.location}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 mt-2">
                  Ending date: [{end_time}]
                </div>
              </div>
              <CardFooter className="flex justify-end items-center p-4">
                <Button
                  color="purple"
                  className="hover:bg-purple-700 focus:outline-none focus:border-purple-700"
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          );
        })}


    </div>
       <div className="">
        <Typography  color="blue-gray" className="font-normal ">
          {/* Page {page} of {data.totalPage} */}
        </Typography>
        <div className="flex gap-2">
          <Button
            size="sm"
            disabled={page === 1}
            onClick={() => handlePage(page - 1)}
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() => handlePage(page + 1)}
            disabled={page === data }
          >
            Next
          </Button>
        </div>
      </div>
    </div>

  );
}

export default PostsCard;
