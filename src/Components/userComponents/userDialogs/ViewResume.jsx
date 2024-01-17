import React, { useState } from "react";
import { Document, Page } from 'react-pdf';

import { Button, Dialog, Card } from "@material-tailwind/react";

export function ViewResume({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


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
      
      <Document file={data} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />

      </Document>
    
      <p>
        Page{pageNumber}of {numPages}
      </p>
    </div>

      </Dialog>
    </>
  );
}

