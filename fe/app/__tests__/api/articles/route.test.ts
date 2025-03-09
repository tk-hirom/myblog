import axiosInstance from "@/app/lib/axiosInstance"
import {jest} from "@jest/globals";
import {ENDPOINTS} from "@/app/constants/endpoints";
import {NextRequest} from "next/server";
import {GET} from "@/app/api/articles/route";
import 'dotenv/config';

jest.mock("@/app/lib/axiosInstance")
const mockArticles = [{ id: 1, title: "Test Article" }];
const req = { url: `${process.env.BACKEND_URL}` + `${ENDPOINTS.BE.ARTICLES(null)}` } as NextRequest;

describe('正常系', () => {
    it('GETリクエストをarticlesで受け付けたら、記事一覧を返すこと', async () => {
        (axiosInstance.get as jest.MockedFunction<typeof axiosInstance.get>).mockResolvedValueOnce({ data: mockArticles });
        const res = await GET(req);
        const json = await res.json();
        expect(axiosInstance.get).toHaveBeenCalledWith("/articles");
        expect(res.status).toBe(200);
        expect(json).toEqual(mockArticles);
    })
})

describe('異常系', () => {
    it('BEがエラーを返したら、エラーを投げること', async () => {
        (axiosInstance.get as jest.MockedFunction<typeof axiosInstance.get>).mockResolvedValueOnce(new Error("fail"))

        expect(await GET(req))
    })
})