import { useContext } from "react";
import Banner from "../components/Banner";
import HighestRated from "../components/HighestRated";
import UpcomingReleases from "../components/UpcomingReleases";
import { AuthContext } from "../Providers/AuthProvider";
import NewReleases from "../components/NewReleases";

const HomeLayout = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loading loading-spinner text-info text-5xl"></div>
      </div>
    );
  }
  return (
    <div className="py-10 space-y-5 mx-2 lg:mx-5">
      <Banner></Banner>
      <HighestRated></HighestRated>
      <NewReleases></NewReleases>
      <UpcomingReleases></UpcomingReleases>
    </div>
  );
};

export default HomeLayout;
