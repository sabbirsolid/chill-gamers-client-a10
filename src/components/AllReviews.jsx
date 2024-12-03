import { useState } from "react";


const AllReviews = () => {
    const [reviews, setReviews]  = useState([]);
    fetch('http://localhost:3000/reviews',{
        method: "GET"
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        All Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Game Cover */}
            <img
              src={review.gameCoverUrl}
              alt={review.gameTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              {/* Game Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {review.gameTitle}
              </h3>
              {/* Genre */}
              <p className="text-gray-600 text-sm mb-2">
                <strong>Genre:</strong> {review.genre}
              </p>
              {/* Rating */}
              <p className="text-gray-600 text-sm mb-2">
                <strong>Rating:</strong> {review.rating}/10
              </p>
              {/* Description */}
              <p className="text-gray-700 text-sm mb-4">
                {review.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;