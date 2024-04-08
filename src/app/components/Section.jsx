import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/Section.css";

export const Section = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300"; // Bas-URL för bilder

  useEffect(() => {
    const getMoviesByGenre = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/discover/movie?with_genres=${genre.id}&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        console.log(data);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMoviesByGenre();
  }, []);

  return (
    <div className="Section-row">
      <h2 className="Section-row-title m-2">{genre.name}</h2>
      <div className="Section-row-poster flex overflow-x-scroll py-1 hide-scrollbar scroll-sideways whitespace-nowrap m-3">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              className="Section-movie inline-block w-auto mr-4 shrink-0"
              key={movie.id}
            >
              <Image
                src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                alt={movie.title}
                width={300}
                height={200}
                layout="intrinsic"
                className="hover:scale-105 duration-300 cursor-pointer"
              />
            </div>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
};
