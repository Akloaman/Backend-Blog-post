const db = require('../models/db');

exports.addComment = async (req, res) => {
    const { post_id, user_id, comment_content } = req.body;
    try {
        await db.execute('INSERT INTO comments (post_id, user_id, comment_content) VALUES (?, ?, ?)', [post_id, user_id, comment_content]);
        res.status(201).json({ message: 'Comment added' });
    } catch (err) {
        res.status(500).json({ error: 'Error adding comment.' });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const [comments] = await db.execute('SELECT * FROM comments');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching comments.' });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const [comment] = await db.execute('SELECT * FROM comments WHERE comment_id = ?', [req.params.id]);
        if (comment.length === 0) return res.status(404).json({ message: 'Comment not found' });
        res.json(comment[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching comment.' });
    }
};

exports.updateComment = async (req, res) => {
    const { comment_content } = req.body;
    try {
        await db.execute('UPDATE comments SET comment_content = ? WHERE comment_id = ?', [comment_content, req.params.id]);
        res.json({ message: 'Comment updated' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating comment.' });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        await db.execute('DELETE FROM comments WHERE comment_id = ?', [req.params.id]);
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting comment.' });
    }
};
