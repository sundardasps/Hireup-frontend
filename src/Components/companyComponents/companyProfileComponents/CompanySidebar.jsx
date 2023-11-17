import {useNavigate} from 'react-router-dom'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PlusCircleIcon,
  ClockIcon,
  TableCellsIcon,
  UserIcon
} from "@heroicons/react/24/solid";
import { AddPostForm } from '../companyDialogs/AddPostForm';

function CompanySidebar() {
  const navigate = useNavigate()
  return (
    <div className="">
    <Card className="flex  flex-auto h-fit mx-5 my-5  bg-gray-100  border">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
          <hr className="my-2 border-blue-gray-50" />
        </div>
        <List>
        <ListItem onClick={() => navigate("/company/profile") }>
            <ListItemPrefix>
              <UserIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
            <ListItemSuffix></ListItemSuffix>
          </ListItem>
          <ListItem onClick={() => navigate("/company/posts") }>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5" />
            </ListItemPrefix>
            Posts
            <ListItemSuffix></ListItemSuffix>
          </ListItem>
          <ListItem
            onClick={() => {
            
            }}
          >
            <ListItemPrefix>
              <PlusCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <AddPostForm/>
          </ListItem>
          <ListItem
            onClick={() => {
              
            }}
          >
            <ListItemPrefix>
              <ClockIcon className="h-5 w-5" />
            </ListItemPrefix>
            Sheduled interviews
          </ListItem>
        </List>
      </Card>
    </div>
  )
}

export default CompanySidebar