package com.backend.app.web.controller

import com.backend.app.application.usecase.AddArticle
import com.backend.app.application.usecase.FetchArticle
import com.backend.app.application.usecase.UpdateArticle
import com.backend.app.web.request.ArticleRequest
import com.backend.app.web.response.ArticleResponse
import jakarta.servlet.http.HttpServletRequest
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/articles")
class ArticleController(
    private val fetchArticle: FetchArticle,
    private val addArticle: AddArticle,
    private val updateArticle: UpdateArticle,
) {
    /**
     * 本を全件取得するエンドポイント
     * TODO ページネーションを実装したら、ページ数を受け取るようにする 記事数が増えてからで良い
     *
     * クエリついているときは、検索するように
     */
    @GetMapping
    fun getArticles(@RequestParam(required = false) query: String?): List<ArticleResponse> {
        return try {
            if (query != null) {
                fetchArticle.searchArticles(query).map { ArticleResponse.responseOf(it) }
            } else {
                fetchArticle.fetchArticles().map { ArticleResponse.responseOf(it) }
            }
//        } catch (articleRepositoryException: ArticleRepositoryException) {
//            throw articleRepositoryException
        } catch (e: Exception) {
            logger.error("Error while getting articles", e)
            throw e
        }
    }

    /**
     * 記事詳細ページを表示するための情報を返すエンドポイント
     */
    @GetMapping("/{id}")
    fun getArticleDetail(
        @PathVariable id: Int
    ): ArticleResponse? {
//        logRequestDetails(request, articleRequest) TODO ログ設計は後々考える
        return try {
            val result = fetchArticle.fetchArticleWithBodyBy(id)
            if (result != null) {
                ArticleResponse.responseOf(result)
            } else {
                null
            }
//        } catch (articleRepositoryException: ArticleRepositoryException) {
//            throw articleRepositoryException
        } catch (e: Exception) {
            logger.error("Error while getting a article", e)
            throw e
        }
    }

    @PostMapping("/add_article")
    fun addArticle(
        @Valid @RequestBody articleRequest: ArticleRequest,
        request: HttpServletRequest
    ) {
        logRequestDetails(request, articleRequest)
        try {
            addArticle.addArticle(
                title = articleRequest.title,
                body = articleRequest.body,
                thumbnailPath = articleRequest.thumbnailPath,
                tags = articleRequest.tags
            )
        } catch (e: Exception) {
            logger.error("Error while adding a article", e)
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while adding article")
        }
    }

    @PostMapping("/update_article")
    fun updateArticle(
        @Valid @RequestBody articleRequest: ArticleRequest,
        request: HttpServletRequest
    ) {
        logRequestDetails(request, articleRequest)
        try {
            updateArticle.updateArticle(
                id = articleRequest.id,
                title = articleRequest.title,
                thumbnailPath = articleRequest.thumbnailPath,
                body = articleRequest.body,
                tags = articleRequest.tags
            )
        } catch (e: Exception) {
            logger.error("Error while updating a article", e)
            throw ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while updating an article")
        }
    }

    private fun logRequestDetails(request: HttpServletRequest, articleRequest: ArticleRequest) {
        logger.info("Received request")
        logger.debug("Request Method: {}", request.method)
        logger.debug("Request URI: {}", request.requestURI)
        logger.debug("Request Body: {}", articleRequest)
        request.headerNames.asIterator().forEachRemaining { headerName ->
            logger.debug("Header '{}': {}", headerName, request.getHeader(headerName))
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(ArticleController::class.java)
    }
}