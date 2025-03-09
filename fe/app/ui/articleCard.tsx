// 記事カードコンポーネント
import Link from "next/link";
import Image from "next/image";
import {FetchArticleResponse} from "@/app/lib/types";
import TagsList from "@/app/ui/tagsList";

export const ArticleCard = ({article}: { article: FetchArticleResponse }) => {
    return (
        <Link href={`/articles/${article.id}`}>
            <div
                className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-105">
                {article.thumbnailPath && (
                    <Image
                        src={article.thumbnailPath}
                        alt={article.title}
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover"
                    />
                )}
                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900">{article.title}</h2>
                    <p className="text-sm text-gray-500">{article.updatedAt}</p>
                    <div className="mt-2 flex gap-2">
                        <TagsList article={article}/>
                    </div>
                </div>
            </div>
        </Link>
    );
};
