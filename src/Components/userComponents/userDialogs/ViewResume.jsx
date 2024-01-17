import React from "react";
import {
  Button,
  Dialog,
  Card,
} from "@material-tailwind/react";

export function ViewResume({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button onClick={handleOpen}>View Resume</Button>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full h-full">
          <iframe src={data} width="" height="500rem" title="PDF-file"></iframe>
        </Card>
      </Dialog>
    </>
  );
}
