ALTER TABLE post
ADD COLUMN unique_code VARCHAR,
ADD CONSTRAINT fk_unique_code  FOREIGN KEY (unique_code) REFERENCES "post_request"(unique_code);