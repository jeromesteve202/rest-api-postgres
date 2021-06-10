CREATE DATABASE todo_databse;

--\c into todo_database

-- all tables need scheme to be defined here
CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);