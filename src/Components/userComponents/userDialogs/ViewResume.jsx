import React from "react";
import { Button, Dialog, Card } from "@material-tailwind/react";
import { Document, Page } from 'react-pdf';
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
        
        <div>
 <Document file={data}>
 <Page pageNumber={1} />
 </Document>
 </div>
      </Dialog>
    </>
  );
}

