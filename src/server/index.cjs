const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./paint-app.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS paintings (
            userId INTEGER PRIMARY KEY,
            shapes TEXT,
            title TEXT,
            FOREIGN KEY(userId) REFERENCES users(id)
        )
    `);
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (user) {
            if (user.password === password) {
                db.get("SELECT title, shapes FROM paintings WHERE userId = ?", [user.id], (err, row) => {
                    return res.json({ success: true, userId: user.id, title: row?.title || '', shapes: row?.shapes || '[]' });
                });
            } else {
                return res.json({ success: false, message: 'این کاربر از پیش وجود دارد و این رمز عبور اشتباه است.' });
            }
        } else {
            db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function (err) {
                if (err) return res.status(500).json({ success: false, message: 'خطا در ثبت‌نام' });

                return res.json({ success: true, userId: this.lastID, title: '', shapes: '[]' });
            });
        }
    });
});

app.post('/api/save', (req, res) => {
    const { userId, title, shapes } = req.body;

    db.run(`
        INSERT INTO paintings (userId, title, shapes)
        VALUES (?, ?, ?)
        ON CONFLICT(userId) DO UPDATE SET title=excluded.title, shapes=excluded.shapes
    `, [userId, title, JSON.stringify(shapes)], err => {
        if (err) return res.status(500).json({ success: false, message: 'خطا در ذخیره نقاشی' });
        res.json({ success: true, message: 'نقاشی ذخیره شد' });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
