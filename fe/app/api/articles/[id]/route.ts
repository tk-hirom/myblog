import axios from "axios";
import {mockArticles} from "@/data/mock";
import {NextRequest, NextResponse} from "next/server";

const api = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function GET(req: NextRequest){
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();

        const article = process.env.NODE_ENV === 'development' ?
            mockArticles.find(article => article.id === id) :
            (await api.get(`/articles/${id}`)).data;
        return NextResponse.json(article);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch article data.');
    }
}