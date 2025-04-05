import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import SingleArticlePage from "./Pages/SingleArticlePage";
import AllTopicsPage from "./Pages/AllTopicsPage";
import ArticlesByTopicPage from "./Pages/ArticlesByTopicPage";
import InvalidPathPage from "./Pages/InvalidPathPage";

import "./App.css"

import AllArticlesPage from "./Pages/AllArticlesPage"

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
      <div>
        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<AllArticlesPage />} />
          <Route path="/articles/:article_id" element={<SingleArticlePage />} />
          <Route path="/topics" element={<AllTopicsPage />} />
          <Route path="/topics/:slug" element={<ArticlesByTopicPage />} />
          <Route path="*" element={<InvalidPathPage />} />
        </Routes>
      </div>
  )
}

export default App
