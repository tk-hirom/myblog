package com.backend.app.web

import org.mybatis.spring.annotation.MapperScan
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan("com.backend.app.application", "com.backend.app.infra", "com.backend.app.web")
@MapperScan(basePackages = ["com.backend.app.infra.mapper"])
class BlogApiApplication

fun main(args: Array<String>) {
	runApplication<BlogApiApplication>(*args)
}
