package com.backend.app.application.usecase

import com.backend.app.application.repository.ArticleRepository
import com.backend.app.domain.entity.Article
import com.backend.app.domain.exception.ArticleRepositoryException
import org.slf4j.LoggerFactory
import org.springframework.dao.DataAccessException
import org.springframework.stereotype.Component

@Component
class FetchArticle(
    private val articleRepository: ArticleRepository
) {
    fun fetchArticles(): List<Article> {
        try {
            return articleRepository.fetchArticles()
        } catch (dataAccessException: DataAccessException) {
            throw ArticleRepositoryException("Error while getting articles")
        } catch (e: Exception) {
            logger.error("Error while getting articles", e)
            throw e
        }
    }

    fun searchArticles(query: String): List<Article> {
        try {
            return articleRepository.searchArticles(query)
        } catch (dataAccessException: DataAccessException) {
            throw ArticleRepositoryException("Error while getting articles")
        } catch (e: Exception) {
            logger.error("Error while getting articles", e)
            throw e
        }
    }

    fun fetchArticleWithBodyBy(id: Int): Article? {
        try {
            return articleRepository.fetchArticle(id)
        } catch (dataAccessException: DataAccessException) {
            throw ArticleRepositoryException("Error while getting a article")
        } catch (e: Exception) {
            logger.error("Error while getting a article", e)
            throw e

        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(FetchArticle::class.java)
    }
}