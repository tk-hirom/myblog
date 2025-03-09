package com.backend.app.web.response

import com.backend.app.domain.entity.Article
import com.fasterxml.jackson.annotation.JsonCreator

class ArticleResponse private constructor(
    val id: Int,
    val title: String,
    val body: String?,
    val updatedAt: String,
    val thumbnailPath: String,
    val tags: List<String>,
) {
    companion object {
        @JvmStatic
        @JsonCreator
        fun responseOf(
            article: Article,
        ): ArticleResponse {
            return ArticleResponse(
                id = article.id,
                title = article.title,
                body = article.body,
                thumbnailPath = article.thumbnailPath,
                updatedAt = article.updatedAt,
                tags = article.tags,
            )
        }
    }
}
