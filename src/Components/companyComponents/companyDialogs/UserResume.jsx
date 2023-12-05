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
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


export function UserResume(resume) {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  

  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);
 
  console.log(resume,"========resume page");

  return (
    <>
      <Card
        className="h-64 w-96 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={handleOpen}
      >
      {resume.resumeType === "pdf" ? (
                         <iframe
                         src={resume.resume}
                         width="100%"
                         height="500px"  // Adjust the height as needed
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
       <Dialog size="md"   open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            {/* <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            /> */}
            {/* <div className="-mt-px flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                Tania Andrew
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                @emmaroberts
              </Typography>
            </div> */}
          </div>
          {/* <div className="flex items-center gap-2">
            <IconButton
              variant="text"
              size="sm"
              color={isFavorite ? "red" : "blue-gray"}
              onClick={handleIsFavorite}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>
            <Button color="gray" size="sm">
              Free Download
            </Button>
          </div> */}
        </DialogHeader>
        <DialogBody className="h-[20rem] overflow-y-scroll rounded-lg">
    
              {resume.resumeType === "pdf" ? (
                         <iframe
                         src={resume.resume}
                         width="100%"
                         height="500px"  // Adjust the height as needed
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
          {/* <div className="flex items-center gap-16">
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Views
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                44,082,044
              </Typography>
            </div>
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Downloads
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                553,031
              </Typography>
            </div>
          </div> */}
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