CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE borrowings (
  id SERIAL PRIMARY KEY,
  member_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  borrowed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  returned_at TIMESTAMP,
  penalty BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (member_id) REFERENCES members(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);