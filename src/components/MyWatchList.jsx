import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const MyWatchList = () => {
  const { user,loading } = useContext(AuthContext);
  const [myWatchList, setMyWatchList] = useState([]);

  useEffect(() => {
    fetch(`https://game-lens-server.vercel.app/watchlist`)
      .then((res) => res.json())
      .then((data) => {
        const temp = data?.filter((review) => review.email === user?.email);
        setMyWatchList(temp);
      });
  }, [user.email]);

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
        fetch(`https://game-lens-server.vercel.app/watchlist/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remainingWatchable = myWatchList.filter(
                (review) => review._id !== id
              );
              setMyWatchList(remainingWatchable);
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loading loading-spinner text-info text-5xl"></div>
      </div>
    );
  }

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
                  onClick={() => handleDelete(game._id)}
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
