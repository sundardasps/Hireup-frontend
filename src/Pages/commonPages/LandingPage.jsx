import LandingCards from "../../Components/commonComponents/landingPageComponents/LandingCards";
import UserProfileSlide from "../../Components/commonComponents/landingPageComponents/UserProfileSlide";
import LandingNavbar from "../../Components/commonComponents/landingPageComponents/LandingNavbar";
import UserFooter from "../../Components/userComponents/userCommonComponents/UserFooter";
import CompaniesBanner from "../../Components/commonComponents/landingPageComponents/CompaniesBanner";


function LandingPage() {
  return (
    <>
      <LandingNavbar/>
      <div className="container  m-auto">
      <LandingCards />
      <UserProfileSlide/> 
      <CompaniesBanner/>
      </div>
      <UserFooter/>
      </>
  );
}

export default LandingPage;
