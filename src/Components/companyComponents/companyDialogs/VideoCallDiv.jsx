import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
 
export function VideoCallDiv({currentUser,setroomUrl}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
 
  const currentUserDetails = useSelector((state) => {
    return state.user;
  });


  const myMeeting = async (element) => {
    const appID = 859733393;
    const serverSecret = "be8d2040b643c2b1b04cfea9b93876bb";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
    currentUser,
     currentUser.toString(),
      currentUserDetails.userName
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:5173/user/room/${currentUser}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      
    });
   
  };

  return (
    <>
      <Button onClick={handleOpen}  variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open}  handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          <div ref={myMeeting}/>
        </DialogBody>
        <DialogFooter>

        </DialogFooter>
      </Dialog>
    </>
  );
}