import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { date } from "yup";

function VideoCall() {
  const location = useLocation();
  const { recieverId } = location.state;

  const currentCompany = useSelector((state) => {
    return state.company;
  });


  const myMeeting = async (element) => {
    const appID = 859733393;
    const serverSecret = "be8d2040b643c2b1b04cfea9b93876bb";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      recieverId,
      Date.now().toString(),
      currentCompany.companyName
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:5173/user/room/${recieverId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
    });
   
  };
  return (
    <div className="mt-20">
      <div ref={myMeeting} />
    </div>
  );
}

export default VideoCall;
