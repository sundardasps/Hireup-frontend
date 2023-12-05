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
  List,
  Accordion,
  AccordionHeader,
  ListItem,
  AccordionBody,
} from "@material-tailwind/react";
import {useQuery} from  "@tanstack/react-query"
import { categoryDataForCompany, getUserList } from "../../../Api/companyApi";
import React, { useEffect, useState } from "react";
import MainLoading from "../../commonComponents/Loadings/MainLoding";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {useNavigate} from 'react-router-dom'
export default function UserCards() {
const [search,setSearch] = useState()
const [debouncedSearch,setdebouncedSearch] = useState()
const [category, setCategory] = React.useState([]);
const [open, setOpen] = React.useState(0);
const [filter, setFilter] = useState();
const navigate = useNavigate()

useEffect(() => {
  const fetchCategory = async () => {
    await categoryDataForCompany().then((res) => setCategory(res.data.data));
  };

  fetchCategory();
  const timeoutId = setTimeout(() => {
    setdebouncedSearch(search);
  }, 1000);

  return () => clearTimeout(timeoutId);
}, [search]);



  const {data,isLoading} = useQuery({
     queryKey:["companyHome",{search:debouncedSearch,filter}],
     queryFn: async ()=>{
        const respone = await getUserList({search:debouncedSearch,filter}).then((res)=>res.data)
        return respone
     }
  })

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
  


  if(isLoading){
    return <MainLoading/>
  }

  return (
    <div className="flex justify-between mt-20" >
     <div className="">
        <Card className="fixed h-auto w-full max-w-[17rem] p-1 shadow-xl shadow-blue  border m-5 ">
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
          <div className="p-1">
            <Button onClick={()=>location.reload()} variant="outlined" fullWidth> 
              Get all
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
                   
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-small"
                        onClick={handleFilter}
                      >
                        {value.title}
                      </Typography>
           
                  </ListItem>
    
                </Accordion>
              ))}
          </List>
          <List></List>
        </Card>
      </div>

      {/* <Card className="m-5 shadow-none  lg:w-9/12 p-2"> */}
        <CardBody className=" grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
          {data && data.userList.map((value,index)=>(
           <Card key={index} className="max-w-[14rem] mx-auto h-min rounded-lg overflow-hidden shadow-xl bg-white mt-5  hover:shadow-2xl cursor-pointer border-2  " onClick={()=>navigate(`/company/userProfile`,{state:value._id})}>
            <div className="relative border-b-2">
              {/* Background Image */}
              <img
                src={value.userCoverDp?value.userCoverDp:banner}
                alt="Background"
                className="w-[15rem] h-28 object-fil"
              />
              {/* Profile Image */}
              <img
               src={value.userDp?value.userDp:userLogo}
                alt="Profile"
                className="rounded-full border-4 border-white absolute -bottom-10 left-14  w-28 h-28 outline-double  object-fill"
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
              <Typography color="gray" className="text-center uppercase text-xs mb-5 w-auto">
              {data?value.userTitle:""}
              </Typography>
              <div className="flex justify-center gap-2">
                <Button
                  size="sm"
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
        {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-100 p-4">
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
      {/* </Card> */}
    </div>
  );
}
