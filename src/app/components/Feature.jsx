"use client";
import React, { useEffect, useState } from "react";
import "../styles/Feature.css";
import Youtube from "react-youtube";
import getTrailer from "./Trailer";

function Feature() {
  const [feature, setFeature] = useState(null);
  const [trailer, setTrailer] = useState(false);

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

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setTrailer(null);
      }
    });
    return window.removeEventListener("scroll", null);
  }, []);

  const handleClickPlay = async (movieId) => {
    if (trailer) {
      setTrailer(false);
    } else {
      const trailerUrl = await getTrailer(movieId);
      setTrailer(trailerUrl);
    }
  };

  return (
    feature && (
      <div className="Feature-container m-auto">
        <div
          className="Feature-poster w-full text-white"
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL}${feature.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {trailer && (
          <div className="Feature-trailer">
            <Youtube
              videoId={trailer}
              opts={{
                width: "100%",
                height: "800px",
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  rel: 0,
                  modestbranding: 1,
                  showinfo: 0,
                },
              }}
            />
          </div>
        )}
        {/* Content that will be shown on top of the background image */}
        <div className="Feature-content mt-60 mx-10">
          <h1 className="text-3xl font-semibold mb-4">{feature.title}</h1>
          <div className="Feature-buttons mb-3">
            <button
              onClick={() => handleClickPlay(feature.id)}
              className="bg-slate-900 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mr-2"
            >
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
        {/* The mask that will be shown on top of the background image */}
        <div
          className="Feature-mask absolute left-0 right-0 bottom-0"
          style={{
            height: "70%",
            background:
              "linear-gradient(180deg,transparent,rgba(10,10,10,0.69),#000)",
          }}
        ></div>
      </div>
    )
  );
}

export default Feature;
