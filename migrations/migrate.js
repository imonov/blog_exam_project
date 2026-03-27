import { pool } from "../config/db.config.js";

export const SCHEMA = `
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE posts(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULl,
        user_id INT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        text VARCHAR(128) NOT NULL,
        post_id INT REFERENCES posts(id),
        user_id INT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE likes (
        id SERIAL PRIMARY KEY,
        post_id INT REFERENCES posts(id),
        user_id INT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

async function migrate() {
    try {
        await pool.query(SCHEMA);
        console.log("TABLES MIGRATED ");
    } catch (error) {
        console.log(`MIGRATION ERROR:\n${error}`);
    }
}

await migrate();
