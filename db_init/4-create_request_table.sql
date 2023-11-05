CREATE TABLE post_request (
    request_id SERIAL PRIMARY KEY,
    user_id INT,
    post_id INT NULL,
    unique_code VARCHAR(21) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '30 minutes',
    FOREIGN KEY (user_id) REFERENCES "author"(id),
    FOREIGN KEY (post_id) REFERENCES "post"(id)
);
