import {
  createNewsArticle,
  fetchAllNews,
  fetchFeaturedNews,
} from "../services/news.service.js";
import { apiResponse } from "../utils/api.response.js";
import { MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS_CODES } from "../constants/status.codes.js";

export const healthCheck = (req, res) => {
  return apiResponse(
    res,
    HTTP_STATUS_CODES.OK,
    null,
    MESSAGES.SUCCESS.NEWS_SERVICE_HEALTHY,
    true,
    true,
  );
};

export const createNews = async (req, res, next) => {
  try {
    const article = await createNewsArticle(req.body);
    return apiResponse(
      res,
      HTTP_STATUS_CODES.CREATED,
      article,
      MESSAGES.SUCCESS.NEWS_CREATED,
      true,
    );
  } catch (error) {
    return next(error);
  }
};

export const getAllNews = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = "publishedAt",
      order = "desc",
    } = req.query;

    const result = await fetchAllNews(
      req.query,
      Number(page),
      Number(limit),
      sort,
      order,
    );

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      {
        page: Number(page),
        limit: Number(limit),
        total: result.total,
        totalPages: Math.ceil(result.total / Number(limit)),
        sort,
        order,
        data: result.articles,
      },
      MESSAGES.SUCCESS.ALL_NEWS_FETCHED,
      true,
    );
  } catch (error) {
    return next(error);
  }
};

export const getFeaturedNews = async (req, res, next) => {
  try {
    const articles = await fetchFeaturedNews();

    return apiResponse(
      res,
      HTTP_STATUS_CODES.OK,
      articles,
      MESSAGES.SUCCESS.FEATURED_NEWS_FETCHED,
      true,
    );
  } catch (error) {
    return next(error);
  }
};
