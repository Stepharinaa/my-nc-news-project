import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from "react-router-dom"
import ArticleList from '../Components/ArticleList'
import { fetchArticles } from '../utils/api'
import SortByBox from '../Components/SortByBox'
import FilterByTopicBar from '../Components/FilterByTopicBar'

function AllArticlesPage(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const [error, setError] = useState(null)

    const sortBy = searchParams.get("sort_by") || "created_at"
    const order = searchParams.get("order") || "DESC"
    const topic = searchParams.get("topic") || ""

    useEffect(() => {
        setIsLoading(true)
        setError(null)
        fetchArticles(sortBy, order, topic)
        .then((data) => {
            setArticles(data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching articles:", error)
            if (error.response && error.response.status === 404) {
              setError("Oops! The article(s) you're looking for doesn't exist.")
            } else {
            setError("Error fetching articles. Please try again!")
            }
            setIsLoading(false);
        })
    }, [sortBy, order, topic])

    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p className="error-message">{error}</p>;

    const handleSortChange = (newSortBy) => {
        setSearchParams({ sort_by: newSortBy, order });
    };
    
    const handleOrderChange = (newOrder) => {
        setSearchParams({ sort_by: sortBy, order: newOrder });
    }

    const handleTopicChange = (newTopic) => {
        setSearchParams({ sort_by: sortBy, order: order, topic: newTopic });
    };

return (
    <main>
        <h1>All Articles</h1>
        <FilterByTopicBar setTopic={handleTopicChange} />
        <SortByBox onSortChange={handleSortChange} onOrderChange={handleOrderChange}/>
        {articles.length === 0 ? (<p>No articles found.</p>
        ) : (
        <ArticleList articles={articles} />
        )}
    </main>
);
}

export default AllArticlesPage