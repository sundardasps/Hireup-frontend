import photo from "../../../../public/employee.jpeg";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";

function CompanyDetails() {
  return (
    <div className="flex justify-start">
      <Card className="flex justify-between container mx-2 my-5  sm:w-80 bg-gray-100 md:w-2/3 lg:w-2/3 xl:w-2/3 h-auto border">
        <CardHeader className="flex flex-col sm:flex-row justify-between w-auto   m-4 first-letter rounded">
          <div className=" w-full sm:w-40 h-60 sm:h-auto ">
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover shadow-black  shadow-sm rounded"
            />
          </div>
          <div className="mx-2 my-2  container border shadow-lg rounded-lg p-4">
            <text className="text-4xl text-light-blue-700 font-bold  underline">
              Company name
            </text>
            <div className="flex flex-col sm:flex-row gap-4 h-auto sm:h-8 m-5">
              <p className="w-full sm:w-1/3 mb-2 sm:mb-0">location:</p>

              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Size:
              </p>

              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Gst:
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 h-auto sm:h-8 m-5">
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Email:
              </p>
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              >
                Mobile:
              </p>
              <p
                type="text"
                placeholder="Input 4"
                className="w-full sm:w-1/3 mb-2 sm:mb-0"
              ></p>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col sm:flex-row justify-between w-auto h-auto bg-white m-4 first-letter shadow-inner rounded border"></CardBody>
        <CardFooter className="flex justify-end">
          <Button variant="outlined">Edit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CompanyDetails;
