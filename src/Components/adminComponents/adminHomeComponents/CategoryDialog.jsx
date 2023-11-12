import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Option,
  Select,
} from "@material-tailwind/react";

export function CategoryDialog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
 
  return (
    <>
      <Typography>
        <Button color="blue-gray" onClick={handleOpen}>
          Add Category
        </Button>
      </Typography>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Category
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Category
            </Typography>
            <Input label="Add category" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Title
            </Typography>
            <Select size="md" label="Select Title">
              <Option>Material Tailwind HTML</Option>
            </Select>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Add
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
