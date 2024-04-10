import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "../styles/Section.css";

export const Section = ({ genre, functionName, poster }) => {
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300"; // Bas-URL för bilder

  //Funktion for drag-to-scroll
  function dragToScroll(containerRef) {
    let isDown = false;
    let startX;
    let scrollLeft;

    const end = () => {
      isDown = false;
      containerRef.current.classList.remove("grabbing");
    };

    const start = (e) => {
      isDown = true;
      startX = e.pageX || e.touches[0].pageX - containerRef.current.offsetLeft;
      scrollLeft = containerRef.current.scrollLeft;
      containerRef.current.classList.add("grabbing");
    };

    const move = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Multiplier increases scroll speed
      containerRef.current.scrollLeft = scrollLeft - walk;
    };

    return { start, end, move };
  }

  const containerRef = useRef();
  const { start, end, move } = dragToScroll(containerRef);

  // Function for fetching movies by genre OR top rated
  const getMoviesUrl = () => {
    if (functionName === "TopRatedMovies") {
      return `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en`;
    } else {
      return `${BASE_URL}/discover/movie?with_genres=${genre.id}&api_key=${API_KEY}`;
    }
  };

  useEffect(() => {
    const getMoviesByGenre = async () => {
      try {
        const url = getMoviesUrl();
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMoviesByGenre();
  }, []);

  return (
    <div className={`Section-row mb-4 ${poster ? "mt-[720px]" : ""}`}>
      <h2 className="Section-row-title mx-10 text-xl my-2 font-extrabold">
        {genre.name}
      </h2>
      <div
        ref={containerRef}
        onMouseDown={start}
        onMouseLeave={end}
        onMouseUp={end}
        onMouseMove={move}
        onTouchEnd={end}
        onTouchMove={move}
        className="Section-row-poster flex overflow-x-scroll py-1 hide-scrollbar scroll-sideways whitespace-nowrap mx-10"
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              className={`Section-movie w-auto mr-4 shrink-0 ${
                poster ? "overflow-hidden" : ""
              }`}
              key={movie.id}
            >
              <Image
                src={`${IMAGE_BASE_URL}${
                  poster ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title}
                width={300}
                height={100}
                layout="responsive"
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
