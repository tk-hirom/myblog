import { NextResponse } from "next/server";
import axios from "axios";
import {mockArticles} from "@/data/mock";

const api = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function GET() {
    try {
        const articles = process.env.NODE_ENV === 'development' ?
            mockArticles :
            (await api.get(`/articles`)).data;

        return NextResponse.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json(
            { error: "Failed to fetch articles data." },
            { status: 500 }
        );
    }
}
