import axios from "axios";
import {FetchArticleResponse} from "@/app/lib/types";
import {ArticleCard} from "@/app/components/articleCard";

const api = axios.create({
    baseURL: process.env.FE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
})

async function fetchArticles() {
    try {
        const res = await api.get('api/articles');
        return res.data as FetchArticleResponse[];
    } catch (error) {
        console.error(error);
    }
}

export default async function Page() {
    const articles = await fetchArticles();
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">ブログ記事一覧</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles?.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </main>
    );
}
