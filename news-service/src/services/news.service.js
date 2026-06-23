import {
  createNews,
  getAllNews,
  getNewsByCategory,
} from "../repositories/news.repository.js";

export const createNewsArticle = async (
  payload
) => {
  return createNews(payload);
};

export const fetchAllNews = async () => {
  return getAllNews();
};

export const fetchNewsByCategory = async (
  category
) => {
  return getNewsByCategory(category);
};