CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NULL,
    link VARCHAR (500) NOT NULL UNIQUE,
    user_id INT,
    is_allowed boolean DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES "author"(id)
);

       