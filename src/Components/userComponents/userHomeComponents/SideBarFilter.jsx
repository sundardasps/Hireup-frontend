import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { categoryDataForUser } from "../../../Api/userApi";


export function SideBarFilter() {
  const [open, setOpen] = React.useState(0);
  const [category, setCategory] = React.useState([]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      await categoryDataForUser().then((res) => setCategory(res.data.data));
    };
    fetchCategory();
  }, []);

  return (
    <Card className="h-auto w-full max-w-[16rem] p-4 shadow-xl shadow-blue  border-2 m-5">
      <div className="mb-1 p-2">
        <Typography variant="h3" color="blue-gray">
          Job positions
        </Typography>
      </div>
      <List>
        {category&&category.map((value, index) => (
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
              className="p-1 hover:bg-gray-200 border-2 "
              selected={open === index + 1}
            >
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className="border-b-0 p-0"
              >
                <Typography color="blue-gray" className="mr-auto font-small">
                  {value.title}
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              {value.category.map((value, index) => (
                <List
                  key={index}
                  className="p-0 text-sm  "
                  onClick={() => alert()}
                >
                  <ListItem className="font-bold">{value}</ListItem>
                </List>
              ))}
            </AccordionBody>
          </Accordion>
        ))}
      </List>
    </Card>
  );
}
