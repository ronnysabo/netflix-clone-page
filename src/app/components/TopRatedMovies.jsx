"use client";
import React, { useEffect, useState } from "react";

export const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const getTopRatedMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    };
    getTopRatedMovies();
  }, []);

  return;
};
