import axios from "axios";

const api = axios.create({
  baseURL: "https://stephs-northcoders-news.onrender.com/api",
});

const fetchArticles = (sortBy = "created_at", topic = "") => {
  let url = sortBy ? `/articles?sort_by=${sortBy}&order=DESC` : "/articles";
  if (topic) {
    url += `&topic=${topic}`;
  }

  return api
    .get(url)
    .then(({ data }) => data.articles)
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
    });
};

const fetchSingleArticle = (article_id) => {
  return api
    .get(`/articles/${article_id}`)
    .then(({ data }) => data.article)
    .catch((error) => {
      console.error("Error fetching article:", error);
      throw error;
    });
};

const fetchCommentsByArticleID = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => data.comments)
    .catch((error) => {
      console.error("Error fetching comments:", error);
      throw error;
    });
};

const postCommentByArticleID = (article_id, newComment) => {
  return api
    .post(`/articles/${article_id}/comments`, newComment)
    .then(({ data }) => data.comment)
    .catch((error) => {
      console.error("Error posting comment:", error);
      throw error;
    });
};

const fetchTop5Articles = () => {
  return api
    .get("/articles?sort_by=votes&order=DESC&limit=5&page=1")
    .then(({ data }) => data.articles)
    .catch((error) => {
      console.error("Error fetching articles:", error);
      throw error;
    });
};

const fetchTopics = () => {
  return api
    .get("/topics")
    .then(({ data }) => data.topics)
    .catch((error) => {
      console.error("Error fetching topics:", error);
      throw error;
    });
};

export {
  fetchArticles,
  fetchSingleArticle,
  fetchCommentsByArticleID,
  postCommentByArticleID,
  fetchTop5Articles,
  fetchTopics,
};
