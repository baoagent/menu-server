
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./data/menu.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the menu database.');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS MenuCategory (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS MenuItem (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            menuCategoryId TEXT NOT NULL,
            FOREIGN KEY (menuCategoryId) REFERENCES MenuCategory(id)
        )
    `);

    console.log('Database tables created or already exist.');
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});
