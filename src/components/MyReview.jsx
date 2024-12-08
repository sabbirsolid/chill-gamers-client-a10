import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyReview = () => {
  const { user } = useContext(AuthContext);
  const [myReviews, setMyReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Start loading
    fetch(`https://game-lens-server.vercel.app/reviews`)
      .then((res) => res.json())
      .then((data) => {
        const userReviews = data?.filter((review) => review.email === user?.email);
        setMyReviews(userReviews);
        setIsLoading(false); // Stop loading once data is fetched
      })
      .catch(() => {
        setIsLoading(false); // Stop loading even on error
      });
  }, [user?.email]);

  // Deleting an item
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://game-lens-server.vercel.app/reviews/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your review has been deleted.",
                icon: "success",
              });
              const remainingReviews = myReviews.filter(
                (review) => review._id !== id
              );
              setMyReviews(remainingReviews);
            }
          });
      }
    });
  };

  return (
    <div className="border m-3 lg:m-10 rounded-xl">
      <Helmet>
        <title>My Reviews | ChillGamers</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-bold text-center my-6">
        My Reviews
      </h2>

      {isLoading ? ( // Show spinner while data is loading
        <div className="min-h-[300px] flex justify-center items-center">
          <div className="loading loading-spinner text-info text-5xl"></div>
        </div>
      ) : myReviews.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm sm:text-base">
            <thead>
              <tr>
                <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium">
                  No.
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium">
                  Game Title
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium">
                  Genre
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium">
                  Rating
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium hidden sm:table-cell">
                  Email
                </th>
                <th className="px-4 py-2 md:px-6 md:py-3 text-center font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {myReviews.map((review, index) => (
                <tr
                  key={review._id}
                  className="border-t hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-2 md:px-6 md:py-3">{index + 1}</td>
                  <td className="px-4 py-2 md:px-6 md:py-3">{review.gameTitle}</td>
                  <td className="px-4 py-2 md:px-6 md:py-3">{review.genre}</td>
                  <td className="px-4 py-2 md:px-6 md:py-3">{review.rating}/10</td>
                  <td className="px-4 py-2 md:px-6 md:py-3 hidden sm:table-cell">
                    {review.email}
                  </td>
                  <td className="px-4 py-2 md:px-6 md:py-3 text-center flex justify-center space-x-2">
                    <Link
                      to={`/updateReview/${review._id}`}
                      className="px-3 py-1 text-xs sm:text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="px-3 py-1 text-xs sm:text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="min-h-[300px] flex justify-center items-center text-center text-gray-500">
          No reviews found.
        </div>
      )}
    </div>
  );
};

export default MyReview;