import React from "react";
import CompanySidebar from "../../../Components/companyComponents/companyProfileComponents/CompanySidebar";
import PostsCard from "../../../Components/companyComponents/companyPostsComponents/PostsCard";

function CompanyPostPage() {
  return (
    <div className="flex justify-end m-5  "> 
      <PostsCard />
      <div className="hidden lg:block">
      <CompanySidebar />
      </div>
    </div>
  );
}

export default CompanyPostPage;
