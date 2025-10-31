const db = require('../models/db');

exports.createPost = async (req, res) => {
    const { user_id, post_content } = req.body;
    try {
        await db.execute('INSERT INTO posts (user_id, post_content) VALUES (?, ?)', [user_id, post_content]);
        res.status(201).json({ message: 'Post created' });
    } catch (err) {
        res.status(500).json({ error: 'Error creating post.' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const [posts] = await db.execute('SELECT * FROM posts');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching posts.' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const [post] = await db.execute('SELECT * FROM posts WHERE post_id = ?', [req.params.id]);
        if (post.length === 0) return res.status(404).json({ message: 'Post not found' });
        res.json(post[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching post.' });
    }
};

exports.updatePost = async (req, res) => {
    const { post_content } = req.body;
    try {
        await db.execute('UPDATE posts SET post_content = ? WHERE post_id = ?', [post_content, req.params.id]);
        res.json({ message: 'Post updated' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating post.' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const [comments] = await db.execute('SELECT * FROM comments WHERE post_id = ?', [postId]);
        if (comments.length > 0) {
            return res.status(400).json({ message: 'Cannot delete post with comments.' });
        }
        await db.execute('DELETE FROM posts WHERE post_id = ?', [postId]);
        res.json({ message: 'Post deleted.' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting post.' });
    }
};
