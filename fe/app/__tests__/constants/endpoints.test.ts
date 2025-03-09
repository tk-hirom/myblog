import {ENDPOINTS} from "@/app/constants/endpoints";
describe('BE.ARTICLESのテスト', () => {
    it('ARTICLES、queryがnullでない時、queryをパスパラメータに加えたエンドポイントを返すこと', () => {
        expect(ENDPOINTS.BE.ARTICLES("test")).toBe("/articles?query=test")
    })

    it('BE.ARTICLES、queryがnullの時、パスパラメータのないエンドポイントを返すこと', () => {
        expect(ENDPOINTS.BE.ARTICLES(null)).toBe("/articles")
    })
})

describe('BFF.ARTICLESのテスト', () => {
    it('ARTICLES、queryがnullでない時、queryをパスパラメータに加えたエンドポイントを返すこと', () => {
        expect(ENDPOINTS.BFF.ARTICLES("test")).toBe("/api/articles?query=test")
    })

    it('BE.ARTICLES、queryがnullの時、パスパラメータのないエンドポイントを返すこと', () => {
        expect(ENDPOINTS.BFF.ARTICLES(null)).toBe("/api/articles")
    })
})
