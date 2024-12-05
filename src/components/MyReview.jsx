import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MyReview = () => {
  const { user,loading } = useContext(AuthContext);
  const [myReviews, setMyReview] = useState([]);
  useEffect(() => {
    fetch(`https://game-lens-server.vercel.app/reviews`)
      .then((res) => res.json())
      .then((data) => {
        const temp = data?.filter((review) => review.email === user?.email);
        setMyReview(temp);
      });
  }, [user.email]);

  // deleting an item
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
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remainingReviews = myReviews.filter(
                (review) => review._id !== id
              );
              setMyReview(remainingReviews);
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
    <div className=" border m-3 lg:m-10  rounded-xl">
      <h2 className="text-xl md:text-2xl font-bold text-center my-6">
        My Reviews
      </h2>
      <div className="">
      <table className="min-w-full border  border-gray-200">
        <thead>
          <tr className=" text-sm md:text-base">
            <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium ">
              Game Title
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium ">
              Genre
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium ">
              Rating
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium  hidden sm:table-cell">
              Email
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-center font-medium ">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {myReviews?.map((review, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition duration-150 text-sm md:text-base"
            >
              {/* Game Title */}
              <td className="px-4 py-2 md:px-6 md:py-3 ">
                {review.gameTitle}
              </td>
              {/* Genre */}
              <td className="px-4 py-2 md:px-6 md:py-3 ">
                {review.genre}
              </td>
              {/* Rating */}
              <td className="px-4 py-2 md:px-6 md:py-3 ">
                {review.rating}/10
              </td>
              {/* Email (hidden on small screens) */}
              <td className="px-4 py-2 md:px-6 md:py-3  hidden sm:table-cell">
                {review.email}
              </td>
              {/* Actions */}
              <td className="px-4 py-2 md:px-6 md:py-3 text-center">
                <Link
                  to={`/updateReview/${review._id}`}
                  className="px-2 md:px-3 py-1 text-xs md:text-sm text-white bg-blue-500 hover:bg-blue-600 rounded mr-1 md:mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="px-2 md:px-3 py-1 text-xs md:text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default MyReview;
