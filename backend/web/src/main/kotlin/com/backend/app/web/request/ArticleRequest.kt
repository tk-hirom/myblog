package com.backend.app.web.request

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonProperty

class ArticleRequest(
    val id: String,
    val title: String,
    val body: String,
    val thumbnailPath: String,
    val tags: List<String>,
) {
    companion object {
        // JSONからこのメソッドを使ってインスタンスを作成する
        @JvmStatic
        @JsonCreator
        fun create(
            @JsonProperty("id") id: String,
            @JsonProperty("title") title: String,
            @JsonProperty("body") body: String,
            @JsonProperty("thumbnailPath") thumbnailPath: String,
            @JsonProperty("tags") tags: List<String>,
        ): ArticleRequest {
            return ArticleRequest(
                id,
                title,
                body,
                thumbnailPath,
                tags
            )
        }
    }
}