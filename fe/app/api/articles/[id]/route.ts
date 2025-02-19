import {FetchArticleRequest, FetchArticleResponse} from "@/app/lib/types";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function GET(request: FetchArticleRequest): Promise<FetchArticleResponse> {
    try {
         if (process.env.NODE_ENV === 'development') {
             return Promise.resolve({
                    id: '1',
                    title: 'Article Title',
                    tags: ['tag1', 'tag2'],
                    body: 'Article Body',
                }
            )
        } else {
            const response = await api.get(`/articles/${request.id}`);
            return response.data as FetchArticleResponse;
        }
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch article data.');
    }
}