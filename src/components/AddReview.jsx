import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { toast } from "react-toastify";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const genres = ["Action", "RPG", "Adventure", "Sports", "Puzzle", "Shooter"];
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const genre = form.genre.value;
    const rating = form.rating.value;
    const description = form.description.value;
    const gameTitle = form.gameTitle.value;
    const gameCoverUrl = form.gameCoverUrl.value;
    const year = form.year.value;
    const email = user.email;
    const name = user.displayName;
    const review = {email, name, genre, rating, description, gameTitle, gameCoverUrl,year };

    // sending to server
    fetch("http://localhost:3000/reviews",{
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(review)
    })
    .then(res => res.json())
    .then((data) => {
        if(data.acknowledged){
          toast.success('Review submitted successfully')
        }
    })
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Review
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Game Cover URL */}
          <div className="mb-4">
            <label
              htmlFor="gameCover"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Game Cover URL
            </label>
            <input
              type="url"
              name="gameCoverUrl"
              placeholder="Enter game cover image URL"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Game Title */}
          <div className="mb-4">
            <label
              htmlFor="gameTitle"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Game Title
            </label>
            <input
              type="text"
              id="gameTitle"
              name="gameTitle"
              placeholder="Enter game title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Review Description */}
          <div className="mb-4">
            <label
              htmlFor="reviewDescription"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Review Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Write your detailed review"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Rating (1-10)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              placeholder="Enter rating (1-10)"
              min="1"
              max="10"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Publishing Year */}
          <div className="mb-4">
            <label
              htmlFor="publishingYear"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Publishing Year
            </label>
            <input
              type="number"
              id="publishingYear"
              name="year"
              placeholder="Enter publishing year (e.g., 2023)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Genre */}
          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* User Email */}
          <div className="mb-4">
            <label
              htmlFor="userEmail"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              User Email
            </label>
            <input
              type="email"
              id="userEmail"
              defaultValue={user?.email}
              readOnly
              className="w-full px-4 py-2 border bg-gray-100 rounded-lg cursor-not-allowed"
            />
          </div>

          {/* User Name */}
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="userName"
              defaultValue={user?.displayName}
              readOnly
              className="w-full px-4 py-2 border bg-gray-100 rounded-lg cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
