package com.backend.app.domain.entity

class Article(
    val id: Int,
    val title: String,
    val body: String?,
    val thumbnailPath: String,
    val updatedAt: String,
    val tags: List<String>,
)