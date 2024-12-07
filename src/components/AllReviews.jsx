// import { useState, useEffect } from "react";
// import { Link, useLoaderData } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
// import { Helmet } from "react-helmet-async";

// const AllReviews = () => {
//   const data = useLoaderData(); // Assuming data is being loaded initially
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [sortCriteria, setSortCriteria] = useState("rating");
//   const [sortOrder, setSortOrder] = useState("asc");

//   const genres = ["Action", "RPG", "Adventure", "Sports", "Puzzle", "Shooter"];

//   useEffect(() => {
//     // Simulating async data fetching
//     setTimeout(() => {
//       setReviews(data); // Set data once loaded
//       setLoading(false); // Set loading to false
//     }, 500); // Adjust the delay as per your API or loader behavior
//   }, [data]);

//   const handleGenreChange = (e) => {
//     setSelectedGenre(e.target.value);
//   };

//   const handleSortChange = (e) => {
//     setSortCriteria(e.target.value);
//   };

//   const handleOrderChange = (e) => {
//     setSortOrder(e.target.value);
//   };

//   const filteredReviews = selectedGenre
//     ? reviews.filter((review) => review.genre === selectedGenre)
//     : reviews;

//   const sortedReviews = filteredReviews.sort((a, b) => {
//     const compareValueA = sortCriteria === "rating" ? a.rating : Number(a.year);
//     const compareValueB = sortCriteria === "rating" ? b.rating : Number(b.year);

//     if (sortOrder === "asc") {
//       return compareValueA - compareValueB;
//     } else {
//       return compareValueB - compareValueA;
//     }
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="loading loading-spinner text-info text-5xl"></div>
//       </div>
//     );
//   }
//   return (
//     <div className="min-h-screen  py-10">
//       <h2 className="text-3xl font-bold text-center mb-6">All Reviews</h2>
//       <Helmet>
//         <title>All Reviews | ChillGamers</title>
//       </Helmet>

//       {/* Sorting and Filtering Options */}
//       <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6 px-4 md:px-8">
//         {/* Genre Filter */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto">
//           <label htmlFor="genre" className="font-medium  mb-2 sm:mb-0">
//             Filter by Genre:
//           </label>
//           <select
//             id="genre"
//             value={selectedGenre}
//             onChange={handleGenreChange}
//             className="px-4 py-2 w-full sm:w-auto rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="">All Genres</option>
//             {genres.map((genre, index) => (
//               <option key={index} value={genre}>
//                 {genre}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Sorting Options */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto">
//           <div className="lg:flex items-center space-x-2">
//             <label htmlFor="sortCriteria" className="font-medium ">
//               Sort by:
//             </label>
//             <select
//               id="sortCriteria"
//               value={sortCriteria}
//               onChange={handleSortChange}
//               className="px-4 py-2 w-full sm:w-auto rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="rating">Rating</option>
//               <option value="year">Year</option>
//             </select>
//           </div>
//           <div className="lg:flex items-center space-x-2">
//             <label htmlFor="sortOrder" className="font-medium ">
//               Order:
//             </label>
//             <select
//               id="sortOrder"
//               value={sortOrder}
//               onChange={handleOrderChange}
//               className="px-4 py-2 w-full sm:w-auto rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               <option value="asc">Ascending</option>
//               <option value="desc">Descending</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Display Reviews */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 px-4 md:px-8">
//         {sortedReviews.map((review, index) => (
//           <div
//             key={index}
//             className=" shadow-lg rounded-lg overflow-hidden flex flex-col justify-between h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
//           >
//             {/* Game Cover */}
//             <img
//               src={review.gameCoverUrl}
//               alt={review.gameTitle}
//               className="w-full h-32 object-cover rounded-t-lg"
//             />
//             <div className="p-3 flex-grow">
//               {/* Game Title */}
//               <h3 className="text-md font-semibold  mb-1 truncate">
//                 {review.gameTitle}
//               </h3>
//               {/* Genre */}
//               <p className=" text-xs mb-1">
//                 <strong>Genre:</strong> {review.genre}
//               </p>
//               {/* Year */}
//               <p className=" text-xs mb-1">
//                 <strong>Year:</strong> {review.year}
//               </p>
//               {/* Rating */}
//               <div className="flex items-center text-yellow-500 text-xs mb-1">
//                 <FaStar className="text-md" />
//                 <span className="ml-1">Rating: {review.rating}/10</span>
//               </div>
//               {/* Description */}
//               <p className=" text-xs line-clamp-3">{review.description}</p>
//             </div>
//             <div className="p-3  text-right">
//               <Link
//                 to={`/review/${review._id}`}
//                 className="px-4 py-2 text-xs text-white bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 hover:from-teal-500 hover:via-blue-600 hover:to-purple-700 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition-all"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllReviews;


import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const AllReviews = () => {
  const data = useLoaderData(); // Assuming data is being loaded initially
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortCriteria, setSortCriteria] = useState("rating");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); // Search state

  const genres = ["Action", "RPG", "Adventure", "Sports", "Puzzle", "Shooter"];

  useEffect(() => {
    // Simulating async data fetching
    setTimeout(() => {
      setReviews(data); // Set data once loaded
      setLoading(false); // Set loading to false
    }, 500); // Adjust the delay as per your API or loader behavior
  }, [data]);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesGenre = selectedGenre ? review.genre === selectedGenre : true;
    const matchesSearch = review.gameTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const sortedReviews = filteredReviews.sort((a, b) => {
    const compareValueA = sortCriteria === "rating" ? a.rating : Number(a.year);
    const compareValueB = sortCriteria === "rating" ? b.rating : Number(b.year);

    if (sortOrder === "asc") {
      return compareValueA - compareValueB;
    } else {
      return compareValueB - compareValueA;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loading loading-spinner text-info text-5xl"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-10">
      <h2 className="text-3xl font-bold text-center mb-6">All Reviews</h2>
      <Helmet>
        <title>All Reviews | ChillGamers</title>
      </Helmet>

      {/* Search, Sorting, and Filtering Options */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between mb-6 px-4 md:px-8">
        {/* Search Bar */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <input
            type="text"
            placeholder="Search by game title..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          />
        </div>

        {/* Genre Filter */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <label htmlFor="genre" className="font-medium">
            Filter by Genre:
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="">All Genres</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Options */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="sortCriteria" className="font-medium">
              Sort by:
            </label>
            <select
              id="sortCriteria"
              value={sortCriteria}
              onChange={handleSortChange}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
            >
              <option value="rating">Rating</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <label htmlFor="sortOrder" className="font-medium">
              Order:
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleOrderChange}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Display Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 px-4 md:px-8">
        {sortedReviews.map((review, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden flex flex-col justify-between h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={review.gameCoverUrl}
              alt={review.gameTitle}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-3 flex-grow">
              <h3 className="text-md font-semibold mb-1 truncate">
                {review.gameTitle}
              </h3>
              <p className="text-xs mb-1">
                <strong>Genre:</strong> {review.genre}
              </p>
              <p className="text-xs mb-1">
                <strong>Year:</strong> {review.year}
              </p>
              <div className="flex items-center text-yellow-500 text-xs mb-1">
                <FaStar className="text-md" />
                <span className="ml-1">Rating: {review.rating}/10</span>
              </div>
              <p className="text-xs line-clamp-3">{review.description}</p>
            </div>
            <div className="p-3 text-right">
              <Link
                to={`/review/${review._id}`}
                className="px-4 py-2 text-xs text-white bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 hover:from-teal-500 hover:via-blue-600 hover:to-purple-700 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition-all"
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