import {useNavigate} from 'react-router-dom'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
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
import  {AddPostForm}  from '../companyDialogs/AddPostForm';
import { useSelector } from 'react-redux';
import SelectPayment from '../../../Components/companyComponents/companyDialogs/SelectPayment'
function CompanySidebar() {
  const navigate = useNavigate()
  const payment = useSelector((state)=>{return state.company.payment})
  return (
    <div >
    <Card className=" flex  flex-auto h-fit mx-5 my-5  bg-blue-500  border  ">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="white">
            Sidebar
          </Typography>
          <hr className="my-2 border-blue-gray-50" />
        </div>
        <List>
          <ListItem key={"profile"} onClick={() => navigate("/company/profile")  } >
            <ListItemPrefix>
              <UserIcon className="h-5 w-5" color='white' />
            </ListItemPrefix >
            <Typography variant="paragraph" color="white">
            Profile
          </Typography>
          </ListItem>
          <ListItem key={"post"}  onClick={() => navigate("/company/posts") }>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5" color='white'/>
            </ListItemPrefix>
            
            <Typography variant="paragraph" color="white">
            Posts
          </Typography>
          
          </ListItem>

          <ListItem key={"schedule"} 
            onClick={() => {
              navigate("/company/interviewsList")
            }}
          >
            <ListItemPrefix>
              <ClockIcon className="h-5 w-5" color='white' />
            </ListItemPrefix>
            
            <Typography variant="paragraph" color="white">
            Sheduled interviews
          </Typography>
          </ListItem>
        </List>
      </Card>
    </div>
  )
}

export default CompanySidebar