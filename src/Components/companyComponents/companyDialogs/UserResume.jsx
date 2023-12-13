import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
import { Document, Page } from "react-pdf";

export function UserResume(resume) {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);

  console.log(resume, "========resume page");

  return (
    <>
      <Card
        className="h-64 w-96 cursor-pointer overflow-hidden transition-opacity hover:opacity-90 cursor-pointer"
        onClick={handleOpen}
      >
        {resume.resumeType === "pdf" ? (
          <iframe
            src={resume.resume}
            width="100%"
            height="500px" // Adjust the height as needed
            title="PDF-file"
            className=""
            onError={(e) => console.error("Error loading PDF:", e)}
          ></iframe>
        ) : (
          <img
            alt="nature"
            className="w-full  object-cover object-center"
            src={resume.resume}
          />
        )}
      </Card>
      <Dialog size="md" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <Typography variant="lead">Resume/cv</Typography>
        </DialogHeader>
        <DialogBody className="h-[20rem] overflow-y-scroll rounded-lg">
          {resume.resumeType === "pdf" ? (
            <iframe
              src={resume.resume}
              width="100%"
              height="500px" // Adjust the height as needed
              title="PDF-file"
              className=""
              onError={(e) => console.error("Error loading PDF:", e)}
            ></iframe>
          ) : (
            <img
              alt="nature"
              className="w-full  object-cover object-center"
              src={resume.resume}
            />
          )}
        </DialogBody>
        <DialogFooter className="justify-end">
          <Button
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="mr-5 flex items-center"
            onClick={handleOpen}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
