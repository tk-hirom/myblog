import {Suspense} from "react";
import {ArticleCardSkeleton} from "@/app/ui/skeletons";
import Search from "@/app/ui/search";
import ProfileCard from "@/app/ui/profileCard";
import Image from "next/image";
import ArticlesList from "@/app/ui/ArticlesList";


export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="relative w-full h-80 md:h-80 overflow-hidden rounded-lg shadow-lg mb-6">
                <Image
                    src="/mock-thumbnail-2.png"
                    alt="Blog Hero"
                    layout="fill"
                    objectFit="cover"
                />
            </section>

            <Search placeholder="search articles by keywords or tags"/>

            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Suspense fallback={
                            Array(6).fill(null).map((_, index) => <ArticleCardSkeleton key={index}/>)
                        }>
                            <ArticlesList query={query}/>
                        </Suspense>
                    </div>
                </div>

                {/* プロフィールブロック（PC時に右側に配置）  TODO もう少しデザインか配置考える*/}
                <aside className="w-full lg:w-80">
                    <ProfileCard/>
                </aside>
            </div>
        </main>
    );
}
