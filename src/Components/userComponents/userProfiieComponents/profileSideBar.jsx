import { ChevronDownIcon, ChevronRightIcon, PresentationChartBarIcon } from '@heroicons/react/24/solid'
import { Accordion, AccordionBody, AccordionHeader, Button, Card, IconButton, List, ListItem, ListItemPrefix, Textarea, Typography } from '@material-tailwind/react'

function profileSideBar() {
  return (
    <Card className="hidden md:block sm:block  h-[calc(100vh-2rem)] w-full max-h-[20rem] w-full max-w-[15rem] m-5 shadow-xl shadow-blue-gray-900/5 border-2 ">
    <div className="mb-2 p-4">
      <Typography variant="h5" color="blue-gray">
        Sidebar
      </Typography>
    </div>
    <List>
      <Accordion
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
              Dashboard
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">
            <ListItem>
              <ListItemPrefix>
                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              </ListItemPrefix>
              Analytics
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              </ListItemPrefix>
              Reporting
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
              </ListItemPrefix>
              Projects
            </ListItem>
          </List>
        </AccordionBody>
      </Accordion>
    </List>
  </Card>
  )
}

export default profileSideBar
