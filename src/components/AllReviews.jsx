import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const AllReviews = () => {
  const data = useLoaderData();
  const [reviews, setReviews] = useState(data);

  // Fetch updated reviews (optional, as reviews are initially loaded from `useLoaderData`)
  // const handleViewDetails = (id) => {
  //   fetch(`http://localhost:3000/reviews/${id}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }

  

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        All Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between h-full"
          >
            {/* Game Cover */}
            <img
              src={review.gameCoverUrl}
              alt={review.gameTitle}
              className="w-full h-36 object-cover"
            />
            <div className="p-4 flex-grow">
              {/* Game Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                {review.gameTitle}
              </h3>
              {/* Genre */}
              <p className="text-gray-600 text-sm mb-1">
                <strong>Genre:</strong> {review.genre}
              </p>
              {/* Rating */}
              <p className="text-gray-600 text-sm mb-1">
                <strong>Rating:</strong> {review.rating}/10
              </p>
              {/* Description */}
              <p className="text-gray-700 text-sm line-clamp-2">
                {review.description}
              </p>
            </div>
            {/* View Details Button */}
            <div className="p-4 bg-gray-50 text-right">
              <Link to={`/review/${review._id}`}
                className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;