ALTER TABLE post
ADD COLUMN post_type_id INT,
ADD CONSTRAINT fk_post_type_id
    FOREIGN KEY (post_type_id) REFERENCES "post_type"(id);