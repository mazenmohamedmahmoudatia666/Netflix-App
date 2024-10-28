import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${ENV_VARS.TMDB_API_TOKEN}`, // Ensure you are using the correct variable name
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching from TMDB:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
    throw error; // Rethrow the error for further handling
  }
};
