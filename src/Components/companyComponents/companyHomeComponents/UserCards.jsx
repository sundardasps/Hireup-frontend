import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import userLogo from '../../../../public/user.png'
import banner from '../../../../public/banner.webp'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import {useQuery} from  "@tanstack/react-query"
import { getUserList } from "../../../Api/companyApi";
import { useEffect, useState } from "react";
import MainLoading from "../../commonComponents/Loadings/MainLoding";
export default function UserCards() {
const [search,setSearch] = useState()
const [debouncedSearch,setdebouncedSearch] = useState()

const handleSearch = (e) =>{
    setSearch(e.target.value)
}

useEffect(() => {
    const timeoutId = setTimeout(() => {
      setdebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(timeoutId);
  });

  const {data,isLoading} = useQuery({
     queryKey:["companyHome",{search:debouncedSearch}],
     queryFn: async ()=>{
        const respone = await getUserList({search}).then((res)=>res.data)
        return respone
     }
  })

  if(isLoading){
    return <MainLoading/>
  }

  return (
    <div >
      <Card className="h-screen max-w-screen-lg border-1 m-5">
        <CardHeader floated={false} shadow={false} className="rounded-none h-auto">
          <div className="flex flex-col items-center justify-between  md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {/* {TABS.map(({ label, value }) => (
                  <Tab
                    onClick={() => setFilter(value)}
                    key={value}
                    value={value}
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))} */}
              </TabsHeader>
            </Tabs>
            <div  className="w-full md:w-72 m-3">
              <Input
                label="Search"
                autoFocus
                value={search}
                onChange={handleSearch}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className=" grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll ">


          {data && data.userList.map((value,index)=>(
          <Card key={index} className="max-w-[13rem] mx-auto  rounded-lg overflow-hidden shadow-lg bg-white mt-5">
            <div className="relative">
              {/* Background Image */}
              <img
                src={value.userCoverDp?value.userCoverDp:banner}
                alt="Background"
                className="w-full h-28 object-fill"
              />
              {/* Profile Image */}
              <img
               src={value.userDp?value.userDp:userLogo}
                alt="Profile"
                className="rounded-full border-4 border-white absolute -bottom-10 left-12  w-28 h-28 outline-double  object-fill"
              />
            </div>
            <CardBody>
              <div className="my-5 flex items-center justify-center">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-medium"
                >
                 {data?value.userName:""}
                </Typography>
              </div>
              <Typography color="gray" className=" uppercase text-xs mb-5 w-auto">
              {data?value.userTitle:""}
              </Typography>
              <div className="flex justify-center gap-2">
                <Button size="sm" fullWidth={true} color="primary">
                  Connect
                </Button>
                <Button
                  size="sm"
                  fullWidth={true}
                  variant="outlined"
                  color="primary"
                >
                  Message
                </Button>
              </div>
            </CardBody>
          </Card> ))
          }



        </CardBody>
        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page of
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              //   disabled={page === 1}
              //   onClick={() => handlePage(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              //   onClick={() => handlePage(page + 1)}
              //   disabled={page === data.data.totalPage}
            >
              Next
            </Button>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
