CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NULL,
    link VARCHAR (500) NOT NULL UNIQUE,
    author_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (author_id) REFERENCES "author"(id)
);