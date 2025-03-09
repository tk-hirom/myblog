export const ENDPOINTS = {
    BFF: {
        ARTICLES: (query: string | null) => {
            return query ?
                `api/articles?query=${query}` :
                'api/articles'
        }
    },
    BE: {
        ARTICLES: (query: string | null) => {
            return query?
                `/articles?query=${query}`:
                `/articles`;
        },
        ARTICLE: (id: any) => {
            return `/articles/${id}`;
        }
    }
}