import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";
const MyReview = () => {
    const {user} = useContext(AuthContext)
    const [myReviews, setMyReview] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/reviews`)
            .then(res => res.json())
            .then(data => {
                const temp = data?.filter(
                    review => review.email === user?.email
                );
                setMyReview(temp);
            });
    }, [user.email]);
    // console.log(myReview);
    return (
        <div className="overflow-x-auto">
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
            <th className="px-4 py-2 md:px-6 md:py-3 text-left font-medium text-gray-700 hidden sm:table-cell">
              Email
            </th>
            <th className="px-4 py-2 md:px-6 md:py-3 text-center font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {myReviews.map((review, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition duration-150 text-sm md:text-base"
            >
              {/* Game Title */}
              <td className="px-4 py-2 md:px-6 md:py-3 text-gray-800">
                {review.gameTitle}
              </td>
              {/* Genre */}
              <td className="px-4 py-2 md:px-6 md:py-3 text-gray-600">
                {review.genre}
              </td>
              {/* Rating */}
              <td className="px-4 py-2 md:px-6 md:py-3 text-gray-600">
                {review.rating}/10
              </td>
              {/* Email (hidden on small screens) */}
              <td className="px-4 py-2 md:px-6 md:py-3 text-gray-600 hidden sm:table-cell">
                {review.email}
              </td>
              {/* Actions */}
              <td className="px-4 py-2 md:px-6 md:py-3 text-center">
                <Link to={`/updateReview/${review._id}`}
                  className="px-2 md:px-3 py-1 text-xs md:text-sm text-white bg-blue-500 hover:bg-blue-600 rounded mr-1 md:mr-2"
                  onClick={() => onEdit(review)}
                >
                  Edit
                </Link>
                <button
                  className="px-2 md:px-3 py-1 text-xs md:text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                  onClick={() => onDelete(review)}
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

export default MyReview;