import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const UpcomingReleases = () => {
  const [upcomingGames, setUpcomingGames] = useState([]);

  useEffect(() => {
    fetch("https://game-lens-server.vercel.app/upcoming")
      .then((res) => res.json())
      .then((data) => setUpcomingGames(data))
      .catch((error) => alert("Error fetching upcoming games:", error));
  }, []);

  return (
    <div className="py-10 border rounded-xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        🚀 Upcoming Releases
      </h2>
      <Marquee gradient={false} speed={70} pauseOnHover={true}>
        {upcomingGames?.map((game) => (
          <div
            key={game._id}
            className="w-60 mx-4 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={game.gameCoverUrl}
              alt={game.gameTitle}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">
                {game.gameTitle}
              </h3>
              <p className="text-sm mt-1 truncate">
                Release Date: {new Date(game.releaseDate).toLocaleDateString()}
              </p>
              <div className="mt-2 flex items-center text-green-600 text-sm">
                <FaClock className="mr-2" />
                <span>
                  {Math.max(
                    0,
                    Math.ceil(
                      (new Date(game.releaseDate) - new Date()) /
                        (1000 * 60 * 60 * 24)
                    )
                  )}{" "}
                  days to go
                </span>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default UpcomingReleases;