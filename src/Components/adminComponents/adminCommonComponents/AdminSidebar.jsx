import { useNavigate } from "react-router-dom";
import React from "react";
import { jwtDecode } from "jwt-decode";
import userDefalt from "../../../../public/user.png";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Avatar,
} from "@material-tailwind/react";
import {
  InboxIcon,
  PowerIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";

export function AdminSidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const adminToken = localStorage.getItem("adminToken");
  const decoded = jwtDecode(adminToken);
  console.log(decoded, "kkkkkkkkk");

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <Card className="h-screen w-full max-w-[20rem]  shadow-xl shadow-blue  border-2">

      <div className="flex justify-around  bg-blue-gray-50 p-5  items-center rounded-md">
        <img
          alt="tania andrew"
          className=" cursor-pointer w-16 h-14 rounded-lg "
          src={
            (decoded.exist.userDp && decoded.exist.userDp) ||
            (decoded.exist.image && decoded.exist.image) ||
            userDefalt
          }
        />
        <Typography>
          {(decoded.exist.userName && decoded.exist.userName) ||
            (decoded.exist.companyName && decoded.exist.companyName)}
        </Typography>
        
      </div>

      <List>
        {/* <hr className="my-2 border-blue-gray-50" /> */}
        <ListItem onClick={() => navigate("/admin/")}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          dashboard
          <ListItemSuffix>
            {/* <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" /> */}
          </ListItemSuffix>
        </ListItem>
        <ListItem
          onClick={() => {
            navigate("/admin/companies");
          }}
        >
          <ListItemPrefix>
            <BuildingOffice2Icon className="h-5 w-5" />
          </ListItemPrefix>
          Companies
        </ListItem>
        <ListItem
          onClick={() => {
            navigate("/admin/users");
          }}
        >
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          users
        </ListItem>
        <ListItem
          onClick={() => {
            navigate("/admin/category");
          }}
        >
          <ListItemPrefix>
            <ClipboardDocumentListIcon className="h-5 w-5" />
          </ListItemPrefix>
          Category
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem onClick={handleLogOut}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
        {/* <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Category
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
              
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
               
                Categories title
              </ListItem>
              <ListItem>
            
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              
                Categories
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion> */}
      </List>
    </Card>
  );
}
