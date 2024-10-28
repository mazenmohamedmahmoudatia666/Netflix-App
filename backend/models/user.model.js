import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  searchHistory: [
    {
      id: { type: Number, required: true },
      image: String,
      title: String,
      searchType: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export const User = mongoose.model("User", userSchema);
