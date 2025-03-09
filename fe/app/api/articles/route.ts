import {NextRequest, NextResponse} from "next/server";
import axiosInstance from "@/app/lib/axiosInstance";
import {ENDPOINTS} from "@/app/constants/endpoints";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const queryParams = new URLSearchParams(url.search);
        const query = queryParams.get('query');
        const articles = (await axiosInstance.get(ENDPOINTS.BE.ARTICLES(query))).data;

        return NextResponse.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json(
            { error: "Failed to fetch articles data." },
            { status: 500 }
        );
    }
}
