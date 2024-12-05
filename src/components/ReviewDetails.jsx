import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const ReviewDetails = () => {
  const review = useLoaderData();
  const { user } = useContext(AuthContext);
  const [watchList, setWatchList] = useState([]);

  const email = user.email;
  const name = user.displayName;
  const { genre, rating, description, gameTitle, gameCoverUrl } = review;
  const watchItem = {
    email,
    name,
    genre,
    rating,
    description,
    gameTitle,
    gameCoverUrl,
  };

  useEffect(() => {
    fetch(`https://game-lens-server.vercel.app/watchlist`)
      .then((res) => res.json())
      .then((data) => setWatchList(data));
  }, [email]);

  const handleWatchList = () => {
    const isDuplicate = watchList.some(
      (item) =>
        item.gameTitle === watchItem.gameTitle && item.email === watchItem.email
    );

    if (isDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This game is already in your watch list!",
        showConfirmButton: true,
      });
      return;
    }

    fetch("https://game-lens-server.vercel.app/watchlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(watchItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Successfully added to your watch list",
            showConfirmButton: true,
          });
          setWatchList((prev) => [...prev, watchItem]);
        }
      });
  };

  return (
    <div className="max-w-sm mx-auto mt-6"> {/* Added mt-6 for gap */}
      <div className="shadow-lg rounded-md overflow-hidden flex flex-col h-full transform transition-transform hover:scale-105 duration-300">
        {/* Game Cover */}
        <div className="relative">
          <img
            src={review.gameCoverUrl}
            alt={review.gameTitle}
            className="w-full h-32 object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white px-4 py-2">
            <h3 className="text-md font-semibold truncate">
              {review.gameTitle}
            </h3>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-3 space-y-2 flex-grow">
          {/* Reviewer Name */}
          <p className="text-sm font-medium ">
            <strong>Reviewer:</strong> {review.name}
          </p>
          {/* Reviewer Email */}
          <p className="text-sm text-gray-500">
            <strong>Email:</strong> {review.email}
          </p>
          {/* Genre */}
          <p className="text-sm ">
            <strong>Genre:</strong> {review.genre}
          </p>
          {/* Rating */}
          <p className="text-sm ">
            <strong>Rating:</strong> {review.rating}/10
          </p>
          {/* Full Description (no truncation) */}
          <p className="text-sm ">{review.description}</p> {/* Removed truncate class */}
        </div>

        {/* Add to Watch List Button */}
        <div className="p-3 ">
          <button
            className="w-full py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded focus:outline-none focus:ring focus:ring-green-300"
            onClick={handleWatchList}
          >
            Add to Watch List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
