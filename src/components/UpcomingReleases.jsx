import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

const UpcomingReleases = () => {
  const [upcomingGames, setUpcomingGames] = useState([]);

  useEffect(() => {
    // Fetch upcoming games from your backend or API
    fetch("https://game-lens-server.vercel.app/upcoming")
      .then((res) => res.json())
      .then((data) => setUpcomingGames(data))
      .catch((error) => console.error("Error fetching upcoming games:", error));
  }, []);

  return (
    <div className="py-10 border rounded-xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center  mb-6">
        🚀 Upcoming Releases
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-8">
        {upcomingGames?.map((game) => (
          <div
            key={game._id}
            className=" rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={game.gameCoverUrl}
              alt={game.gameTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">
                {game.gameTitle}
              </h3>
              <p className=" text-sm mt-1 truncate">
                Release Date: {new Date(game.releaseDate).toLocaleDateString()}
              </p>
              <div className="mt-2 flex items-center text-indigo-600 text-sm">
                <FaClock className="mr-2" />
                <span>
                  {Math.max(
                    0,
                    Math.ceil(
                      (new Date(game.releaseDate) - new Date()) / (1000 * 60 * 60 * 24)
                    )
                  )}{" "}
                  days to go
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingReleases;
