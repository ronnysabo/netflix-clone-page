"use client";
import React, { useEffect, useState } from "react";
import "../styles/Feature.css";

function Feature() {
  const [feature, setFeature] = useState(null);
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  //korta ner description om den är längre än n tecken
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        const rand = Math.floor(Math.random() * data.results.length);
        setFeature(data.results[rand]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeature();
  }, []);

  return feature ? (
    <div className="Feature-container mx-3">
      <div
        className="Feature-poster w-full text-white"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${feature.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Innehåll som visas ovanpå bakgrundsbilden */}
        <div className="pt-60 px-10">
          <h1 className="text-3xl font-semibold mb-4">{feature.title}</h1>
          <div className="Feature-buttons mb-3">
            <button className="bg-slate-900 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mr-2">
              Play
            </button>
            <button className="bg-slate-900 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded">
              More info
            </button>
          </div>
          <p className="Feature-overview h-36 max-w-[360px]">
            {truncate(feature.overview, 150)}
          </p>
        </div>

        {/* Masken som visas ovanpå bakgrundsbilden */}
        <div
          className="Feature-mask absolute top-100 left-0 right-0 bottom-0"
          style={{
            background:
              "linear-gradient(180deg,transparent,rgba(10,10,10,0.69),#000)",
          }}
        ></div>
      </div>
    </div>
  ) : (
    <div>Loading feature...</div>
  );
}

export default Feature;
