import axios from "axios";
import {FetchArticleResponse} from "@/app/lib/types";
import Image from "next/image";
import TagsList from "@/app/components/tagsList";

const api = axios.create({
    baseURL: process.env.FE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// idを引数に記事詳細を取得してくる非同期メソッド　アロー関数で定義
const fetchArticle = async (id: string) => {
    try {
        const res = await api.get(`api/articles/${id}`);
        return res.data as FetchArticleResponse;
    } catch (error) {
        console.error(error);
    }
}

export default async function Page(
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }
) {
    const articleId =  (await params).id
    const article = await fetchArticle(articleId)
     if (!article) return <div>The article is not found</div>

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                {/* サムネイル画像 */}
                <div className="mb-6 relative w-full h-64">
                    <Image
                        src={article.thumbnail}
                        alt={article.title}
                        layout="fill" // 画像を親要素に合わせて拡大縮小
                        objectFit="cover" // 親要素に合わせて画像をカバー
                        className="rounded-lg"
                    />
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
                <div className="mt-6 flex gap-2">
                    <TagsList article={article}/>
                </div>
                <p className="text-sm text-gray-500 mb-4">{article.date}</p>
                <div className="text-lg text-gray-700 space-y-4" dangerouslySetInnerHTML={{ __html: article.body }} />
            </div>
        </div>
    )
}