import axios from "axios";
import {FetchArticleResponse} from "@/app/lib/types";

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
        <main className="flex min-h-screen flex-col p-6">
            <div>
                {articles?.map((article) =>
                    <div key={article.id} className="p-4 border rounded-lg shadow mb-4">
                        <div>Title: {article.title}</div>
                        <div>Tags: {article.tags.join(", ")}</div>
                        <div>Body: {article.body}</div>
                    </div>
                )}
            </div>
        </main>
    );
}
