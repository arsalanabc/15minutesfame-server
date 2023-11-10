CREATE TABLE queue (
    id SERIAL PRIMARY KEY,
    post_id INT,
    updated_at TIMESTAMP DEFAULT NOW()
);