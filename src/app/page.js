"use client";
import React, { useState, useEffect } from "react";
import { Section } from "./components/Section";
import { NextUIProvider } from "@nextui-org/react";
import Feature from "./components/Feature";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const API = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API}&language=en`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setGenres(data.genres);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="app">
      <NextUIProvider>
        <Feature />
        <Section
          genre={{ name: "Top Rated" }}
          functionName="TopRatedMovies"
          poster
        />
        {genres
          ? genres.map((genre) => <Section genre={genre} key={genre.id} />)
          : null}
      </NextUIProvider>
    </div>
  );
};

export default Home;
