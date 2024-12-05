import { useContext } from "react";
import Banner from "../components/Banner";
import HighestRated from "../components/HighestRated";
import TrendingGames from "../components/TrendingGames";
import UpcomingReleases from "../components/UpcomingReleases";
import { AuthContext } from "../Providers/AuthProvider";
import NewReleases from "../components/NewReleases";



const HomeLayout = () => {
    const {loading} = useContext(AuthContext)
    if (loading) {
        return (
          <div className="min-h-screen flex justify-center items-center">
            <div className="loading loading-spinner text-info text-5xl"></div>
          </div>
        );
      }
    return (
        <div className="py-10c space-x-5">
            <Banner></Banner>
            <HighestRated></HighestRated>
            {/* <TrendingGames></TrendingGames>
             */}
             <NewReleases></NewReleases>
            <UpcomingReleases></UpcomingReleases>
        </div>
    );
};

export default HomeLayout;