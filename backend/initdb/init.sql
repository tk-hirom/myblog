DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS articles_tags;

CREATE TABLE articles
(
    id             SERIAL PRIMARY KEY,
    title          varchar(100) NOT NULL,
    body           TEXT         NOT NULL,
    thumbnail_path varchar(100) NOT NULL,
    created_at     timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 検索しやすいようにテーブル化した
CREATE TABLE tags
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE articles_tags
(
    article_id INT NOT NULL,
    tag_id     INT NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
);

INSERT INTO tags (name)
VALUES ('Redis'),
       ('Docker'),
       ('TypeScript'),
       ('JavaScript'),
       ('Node.js'),
       ('Express.js'),
       ('Nest.js'),
       ('Vue.js'),
       ('Nuxt.js'),
       ('React.js'),
       ('Next.js'),
       ('Kotlin'),
       ('Java'),
       ('Spring Boot'),
       ('Python'),
       ('Go'),
       ('AWS'),
       ('GCP'),
       ('Azure'),
       ('Vercel'),
       ('CircleCI'),
       ('GitHub Actions'),
       ('Kubernetes'),
       ('Terraform'),
       ('Prometheus'),
       ('ガジェット'),
       ('ポエム');

INSERT INTO articles
VALUES (1,
        'Article Title',
        'Article Body',
        '/mock-thumbnail_path.png',
        '2022-01-01',
        '2022-01-01'),
       (2,
        'Article Title 2',
        'Article Body 2',
        '/mock-thumbnail_path-2.png',
        '2022-01-01',
        '2022-01-01'),
       (3,
        'Article Title 2',
        'Article Body 2',
        '/mock-thumbnail_path-2.png',
        '2022-01-01',
        '2022-01-01');

INSERT INTO articles_tags
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 5),
       (2, 6),
       (2, 7),
       (3, 1),
       (3, 2),
       (3, 3);

