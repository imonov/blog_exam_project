import { pool } from "../config/db.config.js";

export async function getCommentByPostId(req, res) {
    const { id } = req.params;
    const { rows: data } = await pool.query(
        `SELECT * FROM comments WHERE post_id = $1;`,
        [id],
    );

    if (data.length > 0) {
        res.status(200).json({
            status: 200,
            data: data,
        });
    } else {
        res.status(404).json({
            status: 404,
            message: "this post dont have comment",
        });
    }
}

export async function createComment(req, res) {
    const { text, post_id, user_id } = req.body;

    try {
        await pool.query(
            `INSERT INTO comments(text, post_id, user_id) VALUES ($1, $2, $3);`,
            [text, post_id, user_id],
        );

        res.status(201).json({
            status: 201,
            message: "comment created",
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            error: error,
        });
    }
}

export async function deleteComment(req, res) {
    const { id } = req.params;

    try {
        await pool.query(`DELETE FROM comments WHERE id = $1;`, [id]);
        res.status(200).json({
            status: 200,
            message: "comment deleted",
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "error deleting comment",
        });
    }
}
