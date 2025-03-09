import {FetchArticleResponse} from "@/app/lib/types";
import {ArticleCard} from "@/app/ui/articleCard";
import axios from "axios";

// serviceか何か用意してあげたいかも
const api = axios.create({
    baseURL: process.env.FE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

async function fetchArticles(query?: string) {
    try {
        const res = await api.get(
            query ?
                `api/articles?query=${query}` :
                'api/articles'
        );
        return res.data as FetchArticleResponse[];
    } catch (error) {
        console.error(error);
    }
}

const ArticlesList = async (
    {query}: {
        query: string;
    }
) => {
    const articles = await fetchArticles(query);
    return (
        <>
            {articles?.map((article) => (
                <ArticleCard key={article.id} article={article}/>
            ))}
        </>
    );
};

export default ArticlesList