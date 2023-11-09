import LandingCards from "../../Components/commonComponents/landingPageComponents/LandingCards";
import UserProfileSlide from "../../Components/commonComponents/landingPageComponents/UserProfileSlide";
import LandingNavbar from "../../Components/commonComponents/landingPageComponents/LandingNavbar";
import UserFooter from "../../Components/userComponents/userCommonComponents/UserFooter";


function LandingPage() {
  return (
    <>
      <LandingNavbar/>
      <LandingCards />
      <UserFooter/>
    </>
  );
}

export default LandingPage;
