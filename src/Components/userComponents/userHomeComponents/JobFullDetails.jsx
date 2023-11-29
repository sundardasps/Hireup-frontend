import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Card,
  Tooltip,
  CardBody,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";
import {
  CalendarDaysIcon,
  ComputerDesktopIcon,
  CurrencyRupeeIcon,
  EllipsisVerticalIcon,
  ShoppingBagIcon,
  CursorArrowRippleIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/20/solid";
import JobApply from "../userDialogs/JobApply";

export function JobFullDetails({ jobdata }) {
  return (
    <div>
      <Card className="  container  bg-white  w-auto  border ">
        <div className="flex  flex-col w-auto m-2 ">
          <text className="flex justify-between text-xl  text-light-blue-700 font-bold   m-1">
            {jobdata.job_title}
          </text>
          <div>
          <text className="flex gap-2 text-sm  text-gray-500 font-bold  m-1">
          <BuildingOffice2Icon className="h-5 w-5 text-teal-500" />
            {jobdata.companyName}
          </text>
          </div>
         
        </div>

        <div className="flex flex-col gap-1 m-2 ">
          <text className="flex ">
            <ShoppingBagIcon className="w-5 h-5 mx-1" />
            {jobdata.job_type}
          </text>
          <text className="flex ">
            <ComputerDesktopIcon className="w-5 h-5 mx-1" />
            {jobdata.experience} year experience needed
          </text>
          <text className="flex ">
            <CurrencyRupeeIcon className="w-5 h-5 mx-1" />
            Salary : {""}
            {jobdata.salery} /-
          </text>
          <text className="flex ">
            <CalendarDaysIcon className="w-5 h-5 mx-1" />
            Application will closes on {""}
            {jobdata.end_time}
          </text>
        </div>

        <div className="flex flex-col w-96  ">
          <div className="mx-4">
            <p className="bg-blue-gray-100">Skills required</p>
            <span className="text-sm ">{jobdata.required_skills}</span>
          </div>
          <div className="mx-4 ">
            <p className="bg-blue-gray-100">Responsibilities</p>
            <span className="text-sm ">{jobdata.responsibilities}</span>
          </div>
        </div>
        <CardFooter className="">
          <Button size="sm" className="flex bg-light-blue-700">
            <CursorArrowRippleIcon className="w-4 h-4" />
            <JobApply   />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
