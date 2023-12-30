import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import React from "react";
import company from "../../../../public/office.jpg";

function CompaniesBanner() {
  return (
    <div className="pt-4 bg-blue-gray-0 ">
      <Typography variant="h2" className="text-center">
        Why Choose Us?
      </Typography>
      <div className="flex justify-center items-center">
        <Typography variant="h6" className="lg:w-[40rem] text-center">
          At Hireup, we curate top-notch opportunities in select software,
          domains, and technologies. Elevate your career by connecting with
          companies seeking skilled professionals.
        </Typography>
      </div>
      <div className="lg:flex justify-center gap-20 p-5">
        <Card className="max-w-[18rem] h-[18rem] overflow-hidden mb-3 bg-white shadow-md shadow-blue-gray-200 border">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-4">
              User-Friendly Design
            </Typography>
            <div className="text-sm">
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  Intuitive Navigation: Ensure easy and straightforward access
                  to information.
                </li>
                <li className="mb-2">
                  Search and Filter Options: Implement robust search and
                  filtering for efficient job.
                </li>
                <li>
                  Responsive Design: Optimize the platform for seamless use
                  across various devices.
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>

        <Card className="max-w-[18rem] h-[18rem] overflow-hidden mb-3 bg-white shadow-blue-gray-200 border">

          <CardBody className="p-4">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Advanced Job Matching
            </Typography>
            <div className="text-sm">
              <ul className="list-disc pl-5">
                <li class="mb-2">
                  Intuitive Navigation: Ensure easy and straightforward access
                  to information.
                </li>
                <li class="mb-2">
                  Search and Filter Options: Implement robust search and
                  filtering for efficient job.
                </li>
                <li>
                  Responsive Design: Optimize the platform for seamless use
                  across various devices.
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>

        <Card className="max-w-[18rem] h-[18rem] overflow-hidden mb-3 bg-white shadow-blue-gray-200 border">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Security and Privacy
            </Typography>
            <div className="text-sm">
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  Intuitive Navigation: Ensure easy and straightforward access
                  to information.
                </li>
                <li className="mb-2">
                  Search and Filter Options: Implement robust search and
                  filtering for efficient job.
                </li>
                <li>
                  Responsive Design: Optimize the platform for seamless use
                  across various devices.
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default CompaniesBanner;
