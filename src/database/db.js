import * as SQLite from 'expo-sqlite';

export const dbName = 'shoppinglist.db';

export const initDBSync = () => {
  const db = SQLite.openDatabaseSync(dbName);
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      isBought INTEGER DEFAULT 0,
      categorie TEXT NOT NULL
    );
  `);
};

export const getDB = () => {
  return SQLite.openDatabaseSync(dbName);
};
