package com.backend.app.infra.entity

import com.backend.app.domain.entity.Article

data class ArticleDto(
    private val id: Int,
    private val title: String,
    private val body: String?,
    private val thumbnailPath: String,
    private val updatedAt: String,
    private val tags: List<ArticleTagDto>
) {

    fun getId(): Int {
        return id
    }

    fun getTitle(): String {
        return title
    }

    fun getBody(): String? {
        return body
    }

    fun getTags(): List<String> {
        return tags.map { it.name }
    }

    fun toEntity(): Article {
        return Article(
            id = id,
            title = title,
            body = body,
            thumbnailPath = thumbnailPath,
            updatedAt = updatedAt,
            tags = tags.map { it.name }
        )
    }
}