import { useState, useEffect } from "react";
import { createArticle, fetchTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";

function CreateArticlePage() {
  let navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [inputs, setInputs] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        setTopics(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch topics:", err);
        setError("Unable to load topics.");
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setConfirmationMessage(false);

    if (!inputs.title || !inputs.topic || !inputs.body) {
      setError("Please fill in all fields!");
      return;
    }

    // User is hardcoded to be grumpy19
    const articleData = {
      ...inputs,
      author: "grumpy19",
    };

    createArticle({ ...inputs, author: "grumpy19" })
      .then((response) => {
        console.log("Article posted!", response);
        setConfirmationMessage(true);
        setInputs({});
        setTimeout(() => navigate("/articles"), 2000);
      })
      .catch((err) => {
        console.error("Error posting article", err);
        setError("Error posting article! Please try again.");
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="create-article-container">
      <h1>📝 Create a New Article</h1>
      {isLoading ? (
        <p>Loading topics...</p>
      ) : (
        <form onSubmit={handleSubmit} className="create-article-form">
          {confirmationMessage && (
            <p className="confirmation-message">
              Article successfully created! Redirecting...
            </p>
          )}
          <label htmlFor="title">
            Enter Article Title:
            <input
              id="title"
              type="text"
              name="title"
              value={inputs.title || ""}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="body">
            Enter Content/Body:
            <textarea
              id="body"
              name="body"
              value={inputs.body || ""}
              onChange={handleChange}
              rows="5"
            />
          </label>

          <label htmlFor="topic">
            Choose a Topic:
            <select
              id="topic"
              name="topic"
              value={inputs.topic || ""}
              onChange={handleChange}
            >
              <option value="">Select a topic</option>
              {topics.map((topic) => (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              ))}
            </select>
          </label>

          {error && <p className="error-message">{error}</p>}
          <input
            id="create-article-button"
            type="submit"
            value="Submit Article"
          />
        </form>
      )}
    </div>
  );
}

export default CreateArticlePage;
