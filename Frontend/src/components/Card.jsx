import React from "react";
import { Link } from "react-router-dom";
const getRatingColor = (rating) => {
  if (rating >= 8.9) return "bg-green-400";
  if (rating >= 8.8) return "bg-yellow-400";
  return "bg-red-400";
};

const Card = ({ movie }) => {
  const ratingColor = getRatingColor(movie.rating);
  console.log(movie);

  return (
    <Link
      to={`/detail/${movie.id}`}
      className='border shadow hover:scale-110 mt-5  transition-all p-3 rounded-md relative cursor-pointer '
    >
      <img
        src={movie.image}
        alt=''
        className='relative rounded  w-full  max-h-[400px] max-w-[450px] object-contain'
      />
      <span
        className={`absolute top-2 right-2 font-semibold ${ratingColor} p-1 rounded-full text-white`}
      >
        {movie.rating}
      </span>
      <h3 className='font-bold text-gray-600 sm:text-lg text-2xl mt-4'>
        {movie.title}
      </h3>
      <div>
        <p>{movie.year}</p>
        <div className='flex flex-wrap mt-2'>
          {movie.genre.map((genre, index) => (
            <span
              key={index}
              className='bg-slate-800 text-white rounded-full px-2 py-1 mr-2 mt-2'
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Card;
