dependencies{
    implementation(project(":domain"))
}

tasks {
    getByName<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
        mainClass.set("com.backend.app.web.BlogApiApplication")
    }
}