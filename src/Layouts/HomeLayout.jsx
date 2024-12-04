import Banner from "../components/Banner";
import HighestRated from "../components/HighestRated";
import TrendingGames from "../components/TrendingGames";
import UpcomingReleases from "../components/UpcomingReleases";



const HomeLayout = () => {
    return (
        <div className="py-10c space-x-5">
            <Banner></Banner>
            <HighestRated></HighestRated>
            <TrendingGames></TrendingGames>
            <UpcomingReleases></UpcomingReleases>
        </div>
    );
};

export default HomeLayout;