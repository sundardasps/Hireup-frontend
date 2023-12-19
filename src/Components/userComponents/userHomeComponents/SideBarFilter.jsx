import React, { useEffect, useState } from "react";

import { categoryDataForUser } from "../../../Api/userApi";
import JobCards from "./JobCards";
import { Accordion, AccordionBody, AccordionHeader, Button, Card, Input, List, ListItem, Typography, } from "@material-tailwind/react";
import { ChevronDownIcon,MagnifyingGlassIcon } from "@heroicons/react/20/solid";


export function SideBarFilter() {
  const [open, setOpen] = React.useState(0);
  const [category, setCategory] = React.useState([]);
  const [search,setSearch] = useState()
  const [filter,setFilter] = useState()
  const [data,setData] = useState({search:"",filter:""})


  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      await categoryDataForUser().then((res) => setCategory(res.data.data));
    };
    fetchCategory();
  }, []);

  const handleSearch =(e)=>{
    setSearch(e.target.value)

  }
  const handleFilter = (e)=>{
     const selectedValue = e.target.innerText; 
     setFilter(selectedValue)
  }




  return (
    <>
    
    < >
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
          <List className="scrollable h-40 ">
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
      </>
    </>
  );
}
