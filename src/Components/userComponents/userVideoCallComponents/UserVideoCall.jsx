import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function UserVideoCall() {
  const { recieverId } = useParams();
  const currentUserDetails = useSelector((state) => {
    return state.user;
  });

  const myMeeting = async (element) => {
    if (currentUserDetails.userId === recieverId) {
      const appID = 859733393;
      const serverSecret = "be8d2040b643c2b1b04cfea9b93876bb";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        recieverId,
        Date.now().toString(),
        currentUserDetails.userName
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
      });
    } else {
      toast.error("Invalid User link!");
    }
  };
  return (
    <div className="mt-20">
      <div ref={myMeeting} />
    </div>
  );
}

export default UserVideoCall;
