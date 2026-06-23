import { createNewsArticle, fetchAllNews,fetchNewsByCategory } from "../services/news.service.js";

export const createNews = async (req, res, next) => {
  try {
    const article = await createNewsArticle(req.body);

    res.status(201).json({
      success: true,
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNews = async (req, res, next) => {
  try {
    const articles = await fetchAllNews();

    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsByCategory = async (
  req,
  res,
  next
) => {
  try {
    const { category } = req.params;

    const articles = await fetchNewsByCategory(
      category
    );

    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};
