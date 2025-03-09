package com.backend.app.infra.entity

data class ArticleTagDto(
    val articleId: Int,
    val tagId: Int,
    val name: String
) {
}