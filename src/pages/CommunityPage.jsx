import React from "react";
import { useParams } from "react-router-dom";
import { CommunityDisplay } from "../components/index";

const CommunityPage = () => {
  const { id } = useParams();

  return (
    <div className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal animate-fadeIn">
      {/* Posts */}
      <CommunityDisplay communityId={id} />
    </div>
  );
};

export default CommunityPage;
