import { pool } from "../config/db.config.js";

export async function getAllPosts(req, res) {
    const { rows: data } = await pool.query(`SELECT * FROM posts;`);

    res.status(200).json({
        status: 200,
        data: data,
    });
}

export async function getPostById(req, res) {
    const { id } = req.params;
    const { rows: post } = await pool.query(
        `SELECT * FROM posts WHERE id = $1;`,
        [id],
    );

    if (post.length > 0) {
        res.status(200).json({
            status: 200,
            post: post,
        });
    } else {
        res.status(404).json({
            status: 404,
            message: "post not found",
        });
    }
}

export async function createPost(req, res) {
    const { title, content, user_id } = req.body;

    try {
        await pool.query(
            `INSERT INTO posts(title, content, user_id) VALUES ($1, $2, $3);`,
            [title, content, user_id],
        );

        res.status(201).json({
            status: 201,
            message: "post created",
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            error: error,
        });
    }
}

export async function updatePost(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        await pool.query(
            `UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3`,
            [title, content, id],
        );

        res.status(200).json({
            status: 200,
            message: "post updated",
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            error: error,
        });
    }
}

export async function deletePost(req, res) {
    const { id } = req.params;

    try {
        await pool.query(`DELETE FROM posts WHERE id = $1;`, [id]);
        res.status(200).json({
            status: 200,
            message: "post deleted",
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "error deleting post",
        });
    }
}

// qo'shimchalar
export async function getPostByUserId(req, res) {
    const { id: user_id } = req.params;

    const { rows: data } = await pool.query(
        `SELECT * FROM posts WHERE user_id = $1;`,
        [user_id],
    );

    res.status(200).json({
        status: 200,
        posts: data,
    });
}

export async function getPostLikesCount(req, res) {
    const { id } = req.params;

    const { rows: data } = await pool.query(
        `SELECT COUNT(*) as like_count FROM likes WHERE post_id = $1`,
        [id],
    );

    res.status(200).json({
        status: 200,
        likesCount: data,
    });
}
