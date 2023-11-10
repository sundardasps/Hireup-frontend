import { userblockOrUnBlock, usersData } from "../../../Api/adminApi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery, useQueryClient } from "@tanstack/react-query";


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
  IconButton,
  Tooltip,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Dialog,
} from "@material-tailwind/react";

import React, { useEffect, useState } from "react";
import { Dialogue } from "../adminCommonComponents/Dialogue";

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

const TABLE_HEAD = ["Member", "Email", "Status", "Number", "Action"];

export function UserListComponent() {
  const [name, setname] = useState("");
  const [size, setSize] = React.useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [debounsedSearch, setDebouncedSearch] = useState("");

  const handleOpen = (value, name) => {
    setSize(value), setname(name);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(timeoutId);
  });

  const queryClient = useQueryClient();

  const { data,isLoading,error } = useQuery({
    queryKey: ["users", { page:page, filter, search: debounsedSearch }],
    queryFn: () =>
      usersData({ page:page, filter, search: debounsedSearch }).then(
        (res) => res.data
      ),
  });

  const handleBlock = async (userId) => {
    try {
      await userblockOrUnBlock({ id: userId });
      queryClient.invalidateQueries("users");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePage = async (newPage) => {
    if (newPage < 1 || newPage > 10) {
      return;
    }
    setPage(newPage);
  };
if(isLoading){
  return <div>

   <Typography variant="h1">loading...</Typography> 
  </div>
}

if(error){
  return <div>
    <Typography>
      errororo
    </Typography>
  </div>
}
  return (
    
    <>
      <Card className="h-full w-full border-2">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Members list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
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
            <div className="w-full md:w-72">
              <Input
                label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
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
            <tbody>
              {data &&
                data.data &&
                data.data.map(
                  ({ _id, userName, is_blocked, email, number }, index) => {
                    const isLast = index === data.data.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={"/public/6876640.jpg"}
                              alt={userName}
                              size="sm"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {userName}
                              </Typography>
                              {/* <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography> */}
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {email}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {/* {org} */}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={is_blocked === true ? "blocked" : "active"}
                              color={
                                is_blocked === true ? "blue-gray" : "green"
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {number}
                          </Typography>
                        </td>

                        <td>
                          <Dialogue  data={{is_blocked:is_blocked,userName,id:_id}} />
                        </td>

                        <td className={classes}>
                          {is_blocked === true ? (
                            <Tooltip content="unblock">
                              <IconButton
                                color="green"
                                variant="text"
                                onClick={() => handleOpen("xs", userName)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                  />
                                </svg>
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip content="block">
                              <IconButton
                                color="red"
                                variant="text"
                                onClick={() => handleOpen("xs", userName)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                  />
                                </svg>
                              </IconButton>
                            </Tooltip>
                          )}

                          <Dialog
                            open={
                              size === "xs" ||
                              size === "sm" ||
                              size === "md" ||
                              size === "lg" ||
                              size === "xl" ||
                              size === "xxl"
                            }
                            size={size || "md"}
                            handler={handleOpen}
                          >
                            {is_blocked === true ? (
                              <DialogHeader>
                                Do you want to unBlock
                                <span className="text-blue-400">{name}</span> ?
                              </DialogHeader>
                            ) : (
                              <DialogHeader>
                                Do you want to Block
                                <span className="text-blue-400">{name}</span> ?
                              </DialogHeader>
                            )}
                            <DialogBody>
                              <span className="text-red-400"> Warning:</span>
                              Blocking this user will restrict their access.
                              Please confirm your decision to proceed.
                            </DialogBody>
                            <DialogFooter className="gap-4">
                              <Button
                                variant="text"
                                color="red"
                                onClick={() => handleOpen(null)}
                                className="mr-1"
                              >
                                <span>no</span>
                              </Button>
                              <Button
                                variant="gradient"
                                color="red"
                                onClick={() => {
                                  handleOpen(null), handleBlock(_id);
                                }}
                              >
                                <span>Yes</span>
                              </Button>
                            </DialogFooter>
                          </Dialog>


                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
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
              disabled={data.data.count}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
