const db = require('../models/db');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user.' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users.' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const [user] = await db.execute('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
        if (user.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(user[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user.' });
    }
};

exports.updateUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        await db.execute('UPDATE users SET username = ?, email = ? WHERE user_id = ?', [username, email, req.params.id]);
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating user.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await db.execute('DELETE FROM users WHERE user_id = ?', [req.params.id]);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user.' });
    }
};
