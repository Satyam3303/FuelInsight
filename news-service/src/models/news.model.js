import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    publishedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "news",
  }
);

newsSchema.index({ category: 1 });
newsSchema.index({ publishedAt: -1 });

const News = mongoose.model("News", newsSchema);

export default News;