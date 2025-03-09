package com.backend.app.application.repository

import com.backend.app.domain.entity.Article

interface ArticleRepository {
    fun fetchArticles(): List<Article>

    fun fetchArticle(id: Int): Article?

    fun addArticle(
        title: String,
        body: String,
        thumbnailPath: String,
        tags: List<String>,
    )

    fun updateArticle(
        id: String,
        title: String,
        body: String,
        thumbnailPath: String,
        tags: List<String>
    )
    
    fun searchArticles(query: String): List<Article>
}