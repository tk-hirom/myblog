export type FetchArticleRequest = {
    id: string;
}

export type FetchArticleResponse = {
    id: string;
    title: string;
    tags: string[];
    body: string;
    thumbnail: string;
    date: string;
}