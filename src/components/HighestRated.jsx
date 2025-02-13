import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
const HighestRated = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch highest-rated games
    fetch("https://game-lens-server.vercel.app/topRated")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div className="py-10 border rounded-xl">
      <div className="mx-auto px-4 lg:px-12">
        <h2 className="text-3xl font-bold text-center mb-12 tracking-tight animate__animated animate__zoomIn">
          🌟 Highest Rated Games 🌟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {games.map((game) => (
            <div
              key={game._id}
              className="shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Game Cover */}
              <img
                src={game.gameCoverUrl}
                alt={game.gameTitle}
                className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="p-4">
                {/* Game Title */}
                <h3 className="text-lg font-semibold  mb-2 hover:text-indigo-600 transition-colors duration-300">
                  {game.gameTitle}
                </h3>
                {/* Game Genre */}
                <p className="text-sm mb-2 capitalize">Genre: {game.genre}</p>
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <FaStar
                    className={`text-lg ${
                      game.rating >= 8
                        ? "text-yellow-500"
                        : game.rating >= 6
                        ? "text-yellow-400"
                        : game.rating >= 4
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }`}
                  />
                  <span className="ml-2 text-sm ">{game.rating}/10</span>
                </div>
                {/* Game Description */}
                <p className="text-sm truncate max-h-24 overflow-hidden mb-6">
                  {game.description}
                </p>
                {/* Explore Details Button */}
                <Link
                  to={`/review/${game._id}`}
                  className="inline-block bg-green-500 text-white py-1 px-2 rounded-md text-sm shadow-lg hover:bg-green-600 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Explore Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighestRated;
