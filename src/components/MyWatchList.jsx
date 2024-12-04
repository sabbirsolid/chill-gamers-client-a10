import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const MyWatchList = () => {
  const { user } = useContext(AuthContext);
  const [myWatchList, setMyWatchList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/watchlist`)
      .then((res) => res.json())
      .then((data) => {
        const temp = data?.filter((review) => review.email === user?.email);
        setMyWatchList(temp);
      });
  }, [user.email]);

  const handleDelete = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      fetch(`http://localhost:3000/reviews/${reviewId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMyWatchList(myWatchList.filter((review) => review.id !== reviewId));
            alert("Review deleted successfully!");
          }
        });
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 my-6">
        My Reviews
      </h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-sm md:text-base">
            <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium text-gray-700">
              Game Title
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium text-gray-700">
              Genre
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium text-gray-700">
              Rating
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-center font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {myWatchList.map((game, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition duration-150 text-sm md:text-base"
            >
              {/* Game Title */}
              <td className="px-4 py-2 md:px-6 md:py-3 text-gray-800">
                {game.gameTitle}
              </td>
              {/* Genre */}
              <td className="px-4 py-2 md:px-6 md:py-3 text-gray-600">
                {game.genre}
              </td>
              {/* Rating */}
              <td className="px-4 py-2 md:px-6 md:py-3 text-gray-600">
                {game.rating}/10
              </td>
              {/* Actions */}
              <td className="px-4 py-2 md:px-6 md:py-3 text-center">
                <button
                  className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                  onClick={() => handleDelete(game.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyWatchList;