import movieTrailer from "movie-trailer";

const getTrailer = async (id) => {
  try {
    const url = await movieTrailer(null, {
      tmdbId: id,
      id: true,
      apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    });
    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
  }
};

export default getTrailer;
