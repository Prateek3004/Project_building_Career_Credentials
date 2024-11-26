CREATE DATABASE test_db;

USE test_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(15)
);

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    note_text TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert Test Data
INSERT INTO users (email, password, first_name, last_name, phone_number)
VALUES ('test@example.com', 'password123', 'John', 'Doe', '1234567890');
