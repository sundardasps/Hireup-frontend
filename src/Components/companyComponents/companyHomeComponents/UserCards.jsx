import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import userLogo from "../../../../public/user.png";
import banner from "../../../../public/banner.webp";
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
  IconButton,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { categoryDataForCompany, getUserList } from "../../../Api/companyApi";
import React, { useEffect, useState } from "react";
import MainLoading from "../../commonComponents/Loadings/MainLoding";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
export default function UserCards() {
  const [search, setSearch] = useState();
  const [debouncedSearch, setdebouncedSearch] = useState();
  const [category, setCategory] = React.useState([]);
  const [open, setOpen] = React.useState(0);
  const [filter, setFilter] = useState();
  const navigate = useNavigate();
  const [active, setActive] = React.useState(1);

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

  const { data, isLoading } = useQuery({
    queryKey: [
      "companyHome",
      { search: debouncedSearch, filter, page: active },
    ],
    queryFn: async () => {
      const respone = await getUserList({
        search: debouncedSearch,
        filter,
        page: active,
      }).then((res) => res.data);
      return respone;
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

  const getItemProps = (index) => ({
    variant: active === index + 1 ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
    className: "rounded-full",
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  //-----------------------------------------------------//

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <div className="flex justify-between h-auto">
        <Card className="hidden lg:block h-[22rem]  p-1 shadow-xl shadow-blue  border m-5 ">
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
            <Button
              onClick={() => location.reload()}
              variant="outlined"
              fullWidth
            >
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

        <CardBody className=" grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
          <Card className=" lg:hidden md:block h-[18rem] w-min  p-1 shadow-xl shadow-blue  border ">
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
              <Button
                onClick={() => location.reload()}
                variant="outlined"
                fullWidth
              >
                Get all
              </Button>
            </div>
            <List className="overflow-y-scroll h-32 ">
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
          </Card>

          {data &&
            data.userList.map((value, index) => (
              <Card
                key={index}
                className="max-w-[14rem] mx-auto h-min  overflow-hidden  bg-white shadow-sm rounded-lg shadow-blue-gray-200 hover:shadow-xl  cursor-pointer   "
                onClick={() =>
                  navigate(`/company/userProfile`, { state: value._id })
                }
              >
                <div className="relative border-b-2 ">
                  {/* Background Image */}
                  <img
                    src={value.userCoverDp ? value.userCoverDp : banner}
                    alt="Background"
                    className="w-[15rem] h-28 object-fill"
                  />
                  {/* Profile Image */}
                  <img
                    src={value.userDp ? value.userDp : userLogo}
                    alt="Profile"
                    className="rounded-full border-4 border-white absolute -bottom-10 left-14  w-28 h-28 outline-double  outline-gray-50  object-fill"
                  />
                </div>
                <CardBody>
                  <div className="my-5 flex items-center justify-center">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {data ? value.userName : ""}
                    </Typography>
                  </div>
                  <Typography
                    color="gray"
                    className="text-center uppercase text-xs mb-5 w-auto"
                  >
                    {data ? value.userTitle : ""}
                  </Typography>
                  <div className="flex justify-center gap-2">
                    <Button
                      className="bg-blue-600 rounded-3xl w-36"
                      size="sm"
                      variant="outlined"
                      color="white"
                    >
                      Message
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
        </CardBody>
      </div>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-100 p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">
            {data && data.totalPage && Array.isArray(data.totalPage)
              ? data.totalPage.map((value, index) => (
                  <IconButton key={index} {...getItemProps(index)}>
                    {index + 1}
                  </IconButton>
                ))
              : ""}
          </div>
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            onClick={next}
            disabled={active === data.totalPage}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
