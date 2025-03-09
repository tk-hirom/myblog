import axios from "axios";
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
        const id = url.pathname.split("/").pop(); // TODO idのバリデーション入れるか？

        const article = (await api.get(`/articles/${id}`)).data;
        return NextResponse.json(article);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch article data.');
    }
}