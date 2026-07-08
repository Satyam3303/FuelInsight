import News from "../models/news.model.js";

export const createNews = async (payload) => {
  return News.create(payload);
};

export const getAllNews = async (
  filters = {},
  page = 1,
  limit = 20,
  sort = "publishedAt",
  order = "desc",
) => {
  const query = {};

  if (filters.category) {
    query.category = new RegExp(`^${filters.category}$`, "i");
  }

  if (filters.location) {
    query.location = new RegExp(`^${filters.location}$`, "i");
  }

  if (filters.fuelType) {
    query.fuelType = new RegExp(`^${filters.fuelType}$`, "i");
  }

  if (filters.importance) {
    query.importance = new RegExp(`^${filters.importance}$`, "i");
  }

  if (filters.search) {
    query.$or = [
      { title: new RegExp(filters.search, "i") },
      { description: new RegExp(filters.search, "i") },
    ];
  }

  const skip = (page - 1) * limit;

  const sortOptions = {
    [sort]: order === "asc" ? 1 : -1,
  };

  const [articles, total] = await Promise.all([
    News.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean(),

    News.countDocuments(query),
  ]);

  return {
    articles,
    total,
  };
};

export const getFeaturedNews = async () => {
  return News.find({
    importance: "high",
  })
    .sort({ publishedAt: -1 })
    .limit(5)
    .lean();
};