package com.backend.app.infra.repository

import com.backend.app.application.repository.ArticleRepository
import com.backend.app.domain.entity.Article
import com.backend.app.infra.entity.ArticleDto
import com.backend.app.infra.entity.ArticleTagDto
import com.backend.app.infra.mapper.ArticleMapper
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Repository

/**
 * Mybatisのn:nの紐付け方法がよくわからないのでMockにした
 */
@Repository
@Profile("dev")
class MockArticleRepositoryImpl(
    private val articleMapper: ArticleMapper
) : ArticleRepository {
    override fun fetchArticles(): List<Article> {
        return try {
            mockArticles.map {
                it.toEntity()
            }
        } catch (e: Exception) {
            throw Exception("Error while getting articles", e)
        }
    }

    override fun fetchArticle(id: Int): Article? {
        return try {
            mockArticles.find { it.getId() == id }?.toEntity()
        } catch (e: Exception) {
            throw Exception("Error while getting a article", e)
        }
    }

    override fun searchArticles(query: String): List<Article> {
        return try {
            // タイトルか、本文、タグ名にqueryが含まれる記事を返す
            mockArticles.filter {
                it.getTitle().contains(query) ||
                it.getBody()?.contains(query) == true ||
                it.getTags().any { tag -> tag.contains(query) }
            }.map {
                it.toEntity()
            }
        } catch (e: Exception) {
            throw Exception("Error while getting articles", e)
        }
    }

    override fun addArticle(title: String, body: String, thumbnailPath: String, tags: List<String>) {
        try {
            articleMapper.insertArticle(
                title = title,
                body = body,
                thumbnailPath = thumbnailPath
            )
        } catch (e: Exception) {
            throw Exception("Error while adding a article", e)
        }
    }

    override fun updateArticle(
        id: String,
        title: String,
        body: String,
        thumbnailPath: String,
        tags: List<String>
    ) {
        try {
            articleMapper.updateArticle(
                id = id,
                title = title,
                body = body,
                thumbnailPath = thumbnailPath
            )

            // TODO 紐付けテーブルのinsertOrUpdate処理を追加する

        } catch (e: Exception) {
            throw Exception("Error while updating a article", e)
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(MockArticleRepositoryImpl::class.java)

        private val mockArticles = listOf(
            ArticleDto(
                id = 1,
                title = "title1",
                body = "body1",
                thumbnailPath = "/mock-thumbnail.png",
                updatedAt = "2021-01-01T00:00:00Z",
                tags = listOf(
                    ArticleTagDto(
                        articleId = 1,
                        tagId = 1,
                        name = "tag1"
                    ),
                    ArticleTagDto(
                        articleId = 1,
                        tagId = 2,
                        name = "tag2"
                    )
                )
            ),
            ArticleDto(
                id = 2,
                title = "title2",
                body = "body2",
                thumbnailPath = "/mock-thumbnail.png",
                updatedAt = "2021-01-01T00:00:00Z",
                tags = listOf(
                    ArticleTagDto(
                        articleId = 2,
                        tagId = 2,
                        name = "tag2"
                    ),
                    ArticleTagDto(
                        articleId = 2,
                        tagId = 3,
                        name = "tag3"
                    )
                )
            ),
            ArticleDto(
                id = 3,
                title = "title3",
                body = "body3",
                thumbnailPath = "/mock-thumbnail-2.png",
                updatedAt = "2021-01-01T00:00:00Z",
                tags = listOf(
                    ArticleTagDto(
                        articleId = 3,
                        tagId = 3,
                        name = "tag3"
                    ),
                    ArticleTagDto(
                        articleId = 3,
                        tagId = 4,
                        name = "tag4"
                    )
                )
            ),
        )
    }
}