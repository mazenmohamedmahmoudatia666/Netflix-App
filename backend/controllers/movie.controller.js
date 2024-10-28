// movie.controller.js
import { fetchFromTMDB } from "../services/tmdb.service.js";

const TMDB_API_KEY = process.env.TMDB_API_TOKEN; // Ensure this is set in your environment

export async function getTrendingMovie(req, res) {
  try {
    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
    const data = await fetchFromTMDB(url);
    const limited = data.results.slice(0, 5);
    res.json({ success: true, content: limited });
  } catch (error) {
    console.error(
      "Error fetching trending movies:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getNowPlayingMovies(req, res) {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US`;
    const data = await fetchFromTMDB(url);
    res.json({ success: true, content: data.results });
  } catch (error) {
    console.error(
      "Error fetching now playing movies:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieTrailer(req, res) {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Movie ID is required" });
  }

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailer: data.results[0] });
  } catch (error) {
    console.error(
      "Error fetching movie trailer:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.status === 404) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Movie ID is required" });
  }

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.error(
      "Error fetching movie details:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.status === 404) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Movie ID is required" });
  }

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error(
      "Error fetching similar movies:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getRecommendationMovies(req, res) {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Movie ID is required" });
  }

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error(
      "Error fetching recommendation movies:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  const validCategories = ["upcoming", "now_playing", "popular", "top_rated"];

  // Validate category
  if (!category || !validCategories.includes(category)) {
    return res
      .status(400)
      .json({ success: false, message: "Valid category is required" });
  }

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error(
      "Error fetching movies by category:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
