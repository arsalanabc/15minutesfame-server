CREATE TABLE post_request (
    id SERIAL PRIMARY KEY,
    user_id INT,
    unique_code VARCHAR(21) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 minutes',
    is_submitted boolean DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES "author"(id)
);
