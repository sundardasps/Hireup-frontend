import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import Logo from '../../../../public/logo.png'
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
  Select,
  Option,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { categoryData } from "../../../Api/adminApi";
import { Dialogue } from "../adminCommonComponents/Dialogue";
import { CategoryDialog } from "./CategoryDialog";
import { CategoryTitleDialog } from "./CategoryTitleDialog";
import { useNavigate } from "react-router-dom";
import { SubcategoryList } from "../adminDialog/SubcategoryList";
import MainLoading from "../../../Components/commonComponents/Loadings/MainLoding"

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Blocked",
    value: "Blocked",
  },
];

const TABLE_HEAD = ["Member", "Status", "Action"];

export function CategoriesTable() {
  const [name, setname] = useState("");
  const [size, setSize] = React.useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [debounsedSearch, setDebouncedSearch] = useState("");
  const [currentCategory, setCategory] = useState([]);
  const navigate = useNavigate();
  const handleOpen = (value, name) => {
    setSize(value), setname(name);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(timeoutId);
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["category", { page: page, filter, search: debounsedSearch }],
    queryFn: () =>
      categoryData({ page: page, filter, search: debounsedSearch }).then(
        (res) => res.data
      ),
  });

  const handlePage = async (newPage) => {
    if (newPage < 1 || newPage > data.totalPage) {
      return;
    }
    setPage(newPage);
  };

  if (isLoading ) {
  
    return  <MainLoading />;
  }

  if (error) {
    return (
      <div>
        <Typography>errororo</Typography>
      </div>
    );
  }
  return (
    <>
      <Card className="h-full w-full border-2 border-black ">
        <CardHeader
          ader
          floated={false}
          shadow={false}
          className="rounded-none"
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Category list
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab
                    onClick={() => setFilter(value)}
                    key={value}
                    value={value}
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <CategoryTitleDialog />

            <CategoryDialog />

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
        </CardHeader>
        <CardBody className="overflow-scroll px-0 h-full">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody >
              {data &&
                data.data &&
                data.data.map(({ _id, title, is_active, category }, index) => {
                  const isLast = index === data.data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={Logo}
                            alt={title}
                            size="sm"
                            onClick={() => navigate(`/admin/category/${_id}`)}
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              
                            >
                              {/* {title} */}
                            </Typography>
                            <SubcategoryList  Subcategories={{category,title,_id}} />
                            {/* <Select
                              onChange={(e) => {
                                setCategory(e.target.value);
                               
                              }} 
                              
                            
                            >
                              {category.map((value, index) => (
                                <Option disabled  key={index} className="text-black border-2">{value} </Option>
                              ))}
                            </Select> */}
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={is_active === false ? "blocked" : "active"}
                            color={is_active === true ? "blue-gray" : "green"}
                          />
                        </div>
                      </td>
                      <td>
                        <Dialogue
                          data={{
                            is_blocked: !is_active,
                            name: title,
                            id: _id,
                            content:
                              "Blocking this category restrict their access Please confirm your decision to proceed",
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {page} of {data.totalPage}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              disabled={page === 1}
              onClick={() => handlePage(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => handlePage(page + 1)}
              disabled={page === data.totalPage}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
