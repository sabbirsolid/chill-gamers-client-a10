import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "animate.css";
import { Typewriter } from "react-simple-typewriter";

const NewReleases = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("next");

  useEffect(() => {
    fetch("https://game-lens-server.vercel.app/newReleases")
      .then((res) => res.json())
      .then((data) => setNewReleases(data))
      .catch((error) => alert("Error fetching new releases:", error));
  }, []);

  const handleAnimation = (direction) => {
    if (isAnimating || newReleases.length === 0) return;
    setIsAnimating(true);
    setAnimationDirection(direction);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === "next") {
          return (prevIndex + 1) % newReleases.length;
        } else {
          return (prevIndex - 1 + newReleases.length) % newReleases.length;
        }
      });
      setIsAnimating(false);
    }, 500); // Matches animation duration
  };

  return (
    <div className="py-10 border rounded-xl relative">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 animate__animated animate__slideInDown">
        <span className="text-blue-500">
          <Typewriter
            words={["🆕 New Releases"]}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h2>
      <div className="flex justify-end px-4 md:px-8 mb-4">
        <button
          onClick={() => handleAnimation("prev")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-l-md"
          disabled={isAnimating}
        >
          ◀
        </button>
        <button
          onClick={() => handleAnimation("next")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-r-md"
          disabled={isAnimating}
        >
          ▶
        </button>
      </div>
      <div className="relative">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 px-4 md:px-8 ${
            isAnimating ? "opacity-50" : "opacity-100"
          }`}
        >
          {newReleases.slice(currentIndex, currentIndex + 5).map((game) => (
            <div
              key={game._id}
              className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-500 animate__animated ${
                animationDirection === "next"
                  ? "animate__slideInRight"
                  : "animate__slideInLeft"
              }`}
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
                <p className="text-sm mt-1 truncate">{game.genre}</p>
                <p className="text-sm mt-2">Release Date: {game.releaseDate}</p>
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/private/addReviews`}
                    className="text-sm text-center bg-gradient-to-r from-green-400 to-green-600 text-white py-1 px-2 rounded-md hover:from-green-500 hover:to-green-700 transition"
                  >
                    Give Review
                  </Link>
                  <Link
                    to={`/reviews`}
                    className="text-sm text-center bg-gradient-to-r from-indigo-400 to-indigo-600 text-white py-1 px-2 rounded-md hover:from-indigo-500 hover:to-indigo-700 transition"
                  >
                    Read Reviews
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewReleases;
