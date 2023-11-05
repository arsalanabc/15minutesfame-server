CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NULL,
    link VARCHAR (500) NOT NULL UNIQUE,
    user_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES "author"(id)
);