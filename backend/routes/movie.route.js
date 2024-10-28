// routes/movie.route.js
import express from "express";
import {
  getTrendingMovie,
  getNowPlayingMovies,
  getMovieDetails,
  getMovieTrailer,
  getSimilarMovies,
  getRecommendationMovies,
  getMoviesByCategory,
} from "../controllers/movie.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Define the routes
router.get("/trending", protectRoute, getTrendingMovie); // Ensure this route is defined
router.get("/nowplaying", getNowPlayingMovies);
router.get("/:id/trailer", getMovieTrailer);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:id/recommendations", getRecommendationMovies);
router.get("/:category", getMoviesByCategory);

export default router;
