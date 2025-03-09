package com.backend.app.infra.mapper

import com.backend.app.infra.entity.ArticleDto
import com.backend.app.infra.typehandler.StringListTypeHandler
import org.apache.ibatis.annotations.Insert
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Results
import org.apache.ibatis.annotations.Result
import org.apache.ibatis.annotations.Select
import org.apache.ibatis.annotations.Update

@Mapper
interface ArticleMapper {

    fun selectArticles(): List<ArticleDto>

    /**
     * 記事の本文を取得する
     */
    @Results(
        value = [
            Result(property = "id", column = "articles.id"),
            Result(property = "title", column = "title"),
            Result(property = "body", column = "body"),
            Result(property = "thumbnailPath", column = "thumbnail_path"),
            Result(property = "updatedAt", column = "updated_at"),
            // タグをリストとしてマッピング
            Result(property = "tags", column = "tag_name", javaType = List::class, typeHandler = StringListTypeHandler::class)
        ]
    )
    @Select(
        """
        SELECT articles.id, title, body, thumbnail_path, updated_at, tags.name as tag_name
        FROM articles
        LEFT JOIN articles_tags ON articles.id = articles_tags.article_id
        LEFT JOIN tags ON articles_tags.tag_id = tags.id
        WHERE id = #{id}
    """
    )
    fun selectArticleWithBodyBy(id: Int): ArticleDto?

    /**
     * TODO 検索速度を上げる Redisなどをうまく活用できないか
     * キーワードをキーにしてブログ記事を引っ張ってこれるようにするとか
     * タグでの検索は簡単に実現できそう
     *
     * インデックスで対応でも良いが、昨日方針がまとまったら行う
     */
    @Results(
        value = [
            Result(property = "id", column = "articles.id"),
            Result(property = "title", column = "title"),
            Result(property = "thumbnailPath", column = "thumbnail_path"),
            Result(property = "updatedAt", column = "updated_at"),
            // タグをリストとしてマッピング
            Result(property = "tags", column = "tag_name", javaType = List::class, typeHandler = StringListTypeHandler::class)
        ]
    )
    @Select(
        """
        SELECT articles.id, title, thumbnail_path, updated_at, tags.name as tag_name
        FROM articles
        LEFT JOIN articles_tags ON articles.id = articles_tags.article_id
        LEFT JOIN tags ON articles_tags.tag_id = tags.id
        WHERE title LIKE #{query}
        OR body LIKE #{query}
        OR tags.name LIKE #{query}
    """)
    fun searchArticles(query: String): List<ArticleDto>

    /**
     * 記事を追加する
     */
    @Insert(
        """
        INSERT INTO articles (title, body, thumbnail_path)
        VALUES (#{title}, #{body}, #{thumbnailPath})
    """
    )
    fun insertArticle(
        title: String,
        body: String,
        thumbnailPath: String,
    )

    /**
     * dashboard側から変更した時に呼び出す
     */
    @Insert(
        """
        INSERT INTO articles_tags (article_id, tag_id)
        VALUES (#{articleId}, #{tagId})
    """
    )
    fun insertArticleTag(
        articleId: Int,
        tagId: Int
    )

    @Update(
        """
        UPDATE articles
        SET title = #{title},
            body = #{body},
            thumbnail_path = #{thumbnailPath}
        WHERE id = #{id}
    """
    )
    fun updateArticle(
        id: String,
        title: String,
        body: String,
        thumbnailPath: String,
    )
}