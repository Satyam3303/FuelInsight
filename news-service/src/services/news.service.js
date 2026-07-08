import {
  createNews,
  getAllNews,
  getFeaturedNews,
} from "../repositories/news.repository.js";
import AppError from "../utils/app.error.js";
import { MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS_CODES } from "../constants/status.codes.js";

export const createNewsArticle = async (payload) => {
  return createNews(payload);
};

export const fetchAllNews = async (filters, page, limit, sort, order) => {
  if (page <= 0 || limit <= 0) {
    throw new AppError(
      MESSAGES.ERROR.PAGE_LIMIT_ERROR,
      HTTP_STATUS_CODES.BAD_REQUEST,
    );
  }

  const result = await getAllNews(filters, page, limit, sort, order);

  if (!result.articles || result.articles.length === 0) {
    throw new AppError(
      MESSAGES.ERROR.NEWS_NOT_FOUND,
      HTTP_STATUS_CODES.NOT_FOUND,
    );
  }
  return result;
};


export const fetchFeaturedNews = async () => {
  return getFeaturedNews();
};
