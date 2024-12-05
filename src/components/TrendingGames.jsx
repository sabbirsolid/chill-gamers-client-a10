import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TrendingGames = () => {
  const [trendingGames, setTrendingGames] = useState([]);

  useEffect(() => {
    // Fetch trending games from your backend or API
    fetch("https://game-lens-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setTrendingGames(data))
      .catch((error) => console.error("Error fetching trending games:", error));
  }, []);

  return (
    <div className="py-10 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        🔥 Trending Games
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-8">
        {trendingGames.map((game) => (
          <div
            key={game._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={game.gameCoverUrl}
              alt={game.gameTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {game.gameTitle}
              </h3>
              <p className="text-gray-600 text-sm mt-1 truncate">
                {game.genre}
              </p>
              <div className="mt-2 text-yellow-500 text-sm">
                {/* ⭐ {game.averageRating.toFixed(1)}/10 */}
              </div>
              <Link
                to={`/review/${game._id}`}
                className="block mt-4 text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Read Reviews
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingGames;