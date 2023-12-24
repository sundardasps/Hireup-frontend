import { useQuery } from "@tanstack/react-query";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { companyPosts } from "../../../Api/companyApi";
import { useEffect, useState } from "react";
import { BuildingOffice2Icon,MagnifyingGlassIcon, UserGroupIcon} from "@heroicons/react/24/solid";
import { Button,Card,CardFooter,Input,Tab,Tabs,TabsHeader,Tooltip,Typography,} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { JobDelete } from "../companyDialogs/JobDelete";





function PostsCard() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [debounsedSearch, setDebouncedSearch] = useState("");
  const TABS = [
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
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", { page: page, filter, search: debounsedSearch}],
    queryFn: () =>
      companyPosts({ page: page, filter, search: debounsedSearch }).then(
        (res) => res.data
      ),
  });

  const handlePage = async (newPage) => {
    if (newPage < 1 || newPage > data.totalPage) {
      return;
    }
    setPage(newPage);
  };



  return (
    <div className="shadow-sm  shadow-blue-gray-200  rounded-lg w-screen " >
      <div className="flex    gap-4 md:flex-row bg-blue-500 p-3 rounded-t-lg">
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
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
            color="white"
            autoFocus
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            icon={<MagnifyingGlassIcon className="h-5 w-5" color="white" />}
          />
        </div>
      </div>

      <div className="flex flex-col items-center  mb-10 ">
        <div className="h-screen ">
        {data &&
          data.data &&
          data.data.map(
            ({
              _id,
              job_title,
              end_time,
              job_type,
              required_skills,
              is_active,
            }) => {
              return (
                <Card
                  key={job_title}
                  className="flex mr-0  sm:flex-row justify-between container my-2 mx-2  xl:w-[38rem] border bg-white  rounded-md hover:shadow-xl "
                >
                  <div className="m-2 mt-4 w-auto h-auto">
                    <img
                      src={data.companyData.image}
                      style={{ width: "80px", height: "60px" }}
                      className="rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col  w-full  m-5">
                    <div>
                      <Typography color="blue" className="text-lg font-bold">
                        {job_title}
                      </Typography>
                    </div>
                    <div className="flex gap-1">
                      <BuildingOffice2Icon className="h-4 w-4 text-teal-500" />
                      <Typography className="text-sm">
                        {data.companyData.companyName}
                      </Typography>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start">
                      <div className="flex justify-center gap-2">
                        <Typography className="font-serift text-sm text-gray-600">
                          Location:{data.companyData.location}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      {is_active ? (
                        <div className="text-black-500 mt-2">
                          Ending date: {end_time}
                        </div>
                      ) : (
                        <div className="text-gray-500 mt-2">
                          Expired : {end_time}
                        </div>
                      )}
                      <div
                        className="mt-2 cursor-pointer font-light hover:underline left-0 "
                        style={{ userSelect: "none" }}
                       
                      >
                        <span  onClick={() =>navigate("/company/post/details", { state: { _id } })}> Show details</span>
                      </div>

                    </div>
                  </div>
                  <CardFooter >
                    <JobDelete data={{_id}} />
                    <Tooltip content="Applied users">
                    <UserGroupIcon className="mt-14 w-6 h-6 cursor-pointer " onClick={() =>navigate("appliedUsers", { state: { _id } })}/>
                    </Tooltip>
                  </CardFooter>
                </Card>
              );
            }
          )}
          </div>
         <div className="">
        <Typography color="blue-gray" className="font-normal ">
          Page {page} of {data && data.totalPage}
        </Typography>
        <div className="flex gap-2">
          <Button
            size="sm"
            disabled={page === 1}
            onClick={() => handlePage(page - 1)}
          >
            Previous
          </Button>
          <Button size="sm" onClick={() => handlePage(page + 1)}>
            Next
          </Button>
        </div>
      </div>
      </div>
  
    </div>
  );
}

export default PostsCard;
