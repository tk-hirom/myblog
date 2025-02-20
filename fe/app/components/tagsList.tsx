import {FetchArticleResponse} from "@/app/lib/types";

export default function TagsList({article}: { article: FetchArticleResponse }) {
    return <>
        {article.tags.map((tag) => (
            <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
                #{tag}
            </span>
        ))}
    </>
}