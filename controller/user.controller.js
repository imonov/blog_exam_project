import { pool } from "../config/db.config.js";

export async function getAllUsers(req, res) {
    const { rows: data } = await pool.query(`SELECT * FROM users;`);

    res.status(200).json({
        status: 200,
        data: data,
    });
}

export async function getUserById(req, res) {
    const { id } = req.params;
    const { rows: user } = await pool.query(
        `SELECT * FROM users WHERE id = $1;`,
        [id],
    );

    if (user.length > 0) {
        res.status(200).json({
            status: 200,
            user: user,
        });
    } else {
        res.status(404).json({
            status: 404,
            message: "user not found",
        });
    }
}

export async function createUser(req, res) {
    const { name, email } = req.body;

    try {
        await pool.query(`INSERT INTO users(name, email) VALUES ($1, $2);`, [
            name,
            email,
        ]);

        res.status(201).json({
            status: 201,
            message: "user created",
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            error: error,
        });
    }
}

export async function getPostCount(req, res) {
    const { id: user_id } = req.params;

    const { rows: data } = await pool.query(
        `SELECT COUNT(*) AS post_count FROM posts WHERE user_id = $1;`,
        [user_id],
    );

    res.status(200).json({
        status: 200,
        postCount: data,
    });
}
