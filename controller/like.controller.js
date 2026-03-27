import { pool } from "../config/db.config.js";

export async function likeComment(req, res) {
    const { id: post_id } = req.params;
    const { user_id } = req.body;

    const { rows: data } = await pool.query(
        `SELECT user_id, post_id FROM likes WHERE user_id = $1 AND post_id = $2;`,
        [user_id, post_id],
    );

    if (data.length != 0) {
        res.status(400).json({
            status: 400,
            message: "post already liked by user",
        });
        return;
    } else {
        try {
            await pool.query(
                `INSERT INTO likes(post_id, user_id) VALUES ($1, $2);`,
                [post_id, user_id],
            );

            res.status(201).json({
                status: 201,
                message: "like created",
            });
        } catch (error) {
            res.status(400).json({
                status: 400,
                error: error,
            });
        }
    }
}

export async function unlikeComment(req, res) {
    const { post_id } = req.params;
    const { user_id } = req.body;

    try {
        await pool.query(
            `DELETE FROM likes WHERE user_id = $1 AND post_id = $2`,
            [user_id, post_id],
        );
        res.status(200).json({
            status: 200,
            message: "like deleted",
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "error deleting like",
        });
    }
}
