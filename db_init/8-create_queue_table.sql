CREATE TABLE queue (
    id SERIAL PRIMARY KEY,
    post_id INT,
    expiring_time TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NOW()
);