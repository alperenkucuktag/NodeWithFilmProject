import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { BiCameraMovie } from "react-icons/bi";
import { FaRegBookmark, FaRegHeart, FaRegStar, FaTrash } from "react-icons/fa";

const Detail = () => {
  // 1- URL'de param olan film id'sini al
  const { id } = useParams();

  // 2- API'dan film verilerini al
  const { data, error, isLoading } = useQuery({
    queryKey: ["movie", id], // queryKey'e id'yi ekleyin
    queryFn: () => api.get(`/movies/${id}`).then((res) => res.data), // Yanıtı doğrudan veri olarak döndür
  });

  //Delete

  // API'dan dönen veriyi doğrudan kullan
  const movie = data;
  // console.log(movie);
  const handleDelete = () => {
    api
      .delete(`/movies/${movie.id}`)
      .then((res) => console.log("başarılı"))
      .catch((err) => console.log("hata var", err));
  };
  console.log(handleDelete);

  return (
    <div className='p-10'>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        movie && (
          <>
            <div>
              <div className='flex justify-end'>
                <button
                  onClick={handleDelete}
                  className='bg-red-600 text-white p-2 rounded-md hover:bg-red-400'
                >
                  <FaTrash />
                </button>
              </div>
              <div className='flex flex-col gap-10 items-center md:flex-row'>
                <div>
                  <img
                    className='rounded-md'
                    width={250}
                    src={movie.image}
                    alt={movie.title}
                  />
                </div>
                <div className='flex flex-col gap-10'>
                  <h1 className='text-3xl font-semibold'>
                    {movie.title} <span>({movie.year})</span>
                  </h1>
                  <p>
                    <span className='font-semibold me-3'>Imdb</span>
                    <span className='p-2 rounded-full font-semibold text-white bg-green-500'>
                      {movie.rating}
                    </span>
                  </p>
                  <div className='flex gap-5'>
                    <button className='bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700'>
                      <FaRegHeart />
                    </button>
                    <button className='bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700'>
                      <FaRegBookmark />
                    </button>
                    <button className='bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700'>
                      <FaRegStar />
                    </button>
                    <button className='bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700'>
                      <BiCameraMovie />
                    </button>
                  </div>
                  <div className='flex gap-5'>
                    <p>
                      <span className='font-semibold'>Kategoriler: </span>
                      {movie.genre.map((genre, index) => (
                        <span
                          key={index}
                          className='inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full mr-2'
                        >
                          {genre}
                        </span>
                      ))}
                    </p>
                  </div>
                  <p>{movie.summary}</p>
                  <a href={movie.youtube}>{movie.youtube}</a>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Detail;
