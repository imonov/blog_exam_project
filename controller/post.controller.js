import { pool } from "../config/db.config.js";

export async function getAllPosts(req, res) {
    const {
        page = 1,
        limit = 10,
        search,
        author,
        sortOrder = "asc",
        sortBy,
    } = req.query;
    const offset = (page - 1) * limit;
    let query = `SELECT * FROM posts`;

    if (search) {
        query += `WHERE title ILIKE '%${search}%' OR content ILIKE '%${search}%'`;
    }

    if (author) {
        query += ` WHERE user_id = ${author}`;
    }

    const SORTABLE_FIELDS = ["id", "title"];
    if (sortBy) {
        if (!SORTABLE_FIELDS.includes(sortBy)) {
            return res.status(400).json({
                status: 400,
                message: `Sorting available only for this columns: ${SORTABLE_FIELDS.join(", ")}`,
            });
        }

        query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;
    }

    const countQuery = query
        .replace("SELECT *", "SELECT COUNT(*)")
        .replace(/ORDER BY.+/i, "");

    const { rows: totalCount } = await pool.query(countQuery);

    const { rows: data } = await pool.query(
        (query += ` LIMIT ${limit} OFFSET ${offset};`),
    );

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
