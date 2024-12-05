import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const UpdateReview = () => {
  const loadedData = useLoaderData();
  const { user } = useContext(AuthContext);
  const { genre, rating, description, gameTitle, gameCoverUrl, year } = loadedData;
  const genres = ["Action", "RPG", "Adventure", "Sports", "Puzzle", "Shooter"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // Collecting form data
    const updatedData = {
      genre: form.genre.value,
      rating: form.rating.value,
      description: form.description.value,
      gameTitle: form.gameTitle.value,
      gameCoverUrl: form.gameCoverUrl.value,
      year: form.year.value,
      email: user.email,
      name: user.displayName,
    };

    // Checking if any changes were made
    const isUnchanged =
      updatedData.genre === genre &&
      updatedData.rating === rating &&
      updatedData.description === description &&
      updatedData.gameTitle === gameTitle &&
      updatedData.gameCoverUrl === gameCoverUrl &&
      updatedData.year === year;

    if (isUnchanged) {
      Swal.fire({
        icon: "info",
        title: "No Changes Detected",
        text: "All information is unchanged.",
      });
      return;
    }

    // Proceeding with the update
    fetch(`https://game-lens-server.vercel.app/reviews/${loadedData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your Review has been Updated!",
            showConfirmButton: true,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div className="min-h-screen my-3 flex items-center justify-center ">
      <div className=" p-8 rounded-xl border shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold  mb-6 text-center">
          Update your Review
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Game Cover URL */}
          <div className="mb-4">
            <label
              htmlFor="gameCover"
              className="block  text-sm font-semibold mb-2"
            >
              Game Cover URL
            </label>
            <input
              type="url"
              defaultValue={gameCoverUrl}
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
              className="block  text-sm font-semibold mb-2"
            >
              Game Title
            </label>
            <input
              defaultValue={gameTitle}
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
              className="block text-sm font-semibold mb-2"
            >
              Review Description
            </label>
            <textarea
              defaultValue={description}
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
              className="block  text-sm font-semibold mb-2"
            >
              Rating (1-10)
            </label>
            <input
              defaultValue={rating}
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
              className="block  text-sm font-semibold mb-2"
            >
              Publishing Year
            </label>
            <input
              defaultValue={year}
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
              className="block  text-sm font-semibold mb-2"
            >
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              defaultValue={genre}
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
              className="block  text-sm font-semibold mb-2"
            >
              User Email
            </label>
            <input
              type="email"
              id="userEmail"
              defaultValue={user?.email}
              readOnly
              className="w-full px-4 py-2 border  rounded-lg cursor-not-allowed"
            />
          </div>

          {/* User Name */}
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block  text-sm font-semibold mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="userName"
              defaultValue={user?.displayName}
              readOnly
              className="w-full px-4 py-2 border rounded-lg cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReview;