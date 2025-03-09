package com.backend.app.infra.repository

import com.backend.app.application.repository.ArticleRepository
import com.backend.app.domain.entity.Article
import com.backend.app.infra.mapper.ArticleMapper
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Repository

// TODO N+1問題になるが、データ数多くないので一旦複数回クエリ投げる方式に BEの開発メインの時期にテコ入れ
@Repository
@Profile("prod")
class ArticleRepositoryImpl(
    private val articleMapper: ArticleMapper
) : ArticleRepository {
    override fun fetchArticles(): List<Article> {
        return try {
            articleMapper.selectArticles().map {
                it.toEntity()
            }
        } catch (e: Exception) {
            throw Exception("Error while getting articles", e)
        }
    }

    override fun fetchArticle(id: Int): Article? {
        return try {
            articleMapper.selectArticleWithBodyBy(id)?.toEntity()
        } catch (e: Exception) {
            throw Exception("Error while getting a article", e)
        }
    }

    override fun searchArticles(query: String): List<Article> {
        return try {
            articleMapper.searchArticles(query).map {
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
        private val logger = LoggerFactory.getLogger(ArticleRepositoryImpl::class.java)
    }
}