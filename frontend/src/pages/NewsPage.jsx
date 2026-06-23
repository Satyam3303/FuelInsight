import { useEffect, useState } from "react";

import { Card, CardContent, Typography, Stack } from "@mui/material";

import api from "../api/api";

function NewsPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/api/news");

        setArticles(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      {" "}
      <Typography variant="h4" gutterBottom>
        Fuel News{" "}
      </Typography>
      <Stack spacing={2}>
        {articles.map((article) => (
          <Card key={article._id} elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {article.title}
              </Typography>

              <Typography variant="body1" paragraph>
                {article.description}
              </Typography>

              <Typography variant="caption">
                Source: {article.source}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
}

export default NewsPage;
