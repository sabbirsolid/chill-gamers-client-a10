import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddReview = () => {
  const { user, loading } = useContext(AuthContext);
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

    const review = {
      email,
      name,
      genre,
      rating,
      description,
      gameTitle,
      gameCoverUrl,
      year,
    };

    // sending to server
    fetch("https://game-lens-server.vercel.app/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit review. Please try again later.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your Review has been saved",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong! Please try again.",
          showConfirmButton: true,
        });
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
    <div className="min-h-screen my-10 mx-3 flex items-center justify-center ">
      <div className=" p-8 rounded-lg border shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold  mb-6 text-center">
          Add New Review
        </h2>
        <Helmet>
          <title>Add Review  | ChillGamers</title>
        </Helmet>

        <form className="" onSubmit={handleSubmit}>
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
              name="gameCoverUrl"
              placeholder="Enter game cover image URL"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
              type="text"
              id="gameTitle"
              name="gameTitle"
              placeholder="Enter game title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
              id="description"
              name="description"
              placeholder="Write your detailed review"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
              type="number"
              id="rating"
              name="rating"
              placeholder="Enter rating (1-10)"
              min="1"
              max="10"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
              type="number"
              id="publishingYear"
              name="year"
              placeholder="Enter publishing year (e.g., 2023)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;