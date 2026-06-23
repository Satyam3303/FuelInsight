import News from "../models/news.model.js";

export const createNews = async (payload) => {
  return News.create(payload);
};

export const getAllNews = async () => {
  return News.find()
    .sort({ publishedAt: -1 })
    .lean();
};

export const getNewsByCategory = async (category) => {
  return News.find({
    category: new RegExp(`^${category}$`, "i"),
  })
    .sort({ publishedAt: -1 })
    .lean();
};