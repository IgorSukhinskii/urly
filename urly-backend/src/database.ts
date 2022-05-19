import Database from "better-sqlite3";
import config from "config";

import shortenUrl from "./shorten";

const databaseFileName: string = config.get("database.fileName");

const schema = `
  CREATE TABLE urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    short TEXT UNIQUE,
    url TEXT NOT NULL UNIQUE,
    clicks INTEGER NOT NULL DEFAULT 0
  );
`;

function createDatabase() {
  const db = new Database(databaseFileName);

  try {
    db.exec(schema);
  } catch (err: any) {
    if (err.message.indexOf("already exists") == -1) {
      throw err;
    }
  }

  return db;
}

const db = createDatabase();

export function insertUrl(url: string): string {
  let id: number | null = null;

  try {
    id = Number(
      db.prepare(`INSERT INTO urls (url) VALUES (?)`)
        .run(url)
        .lastInsertRowid
    );
  } catch (err: any) {
    if (err.code != "SQLITE_CONSTRAINT_UNIQUE") {
      throw err;
    }
  }

  if (id != null) {
    // inserted successfully, time to generate shortened url
    // Number() is used to get rid of potential BigInt
    // as long as we have less than 2^53 rows we should be good
    const short = shortenUrl(id);
    db.prepare(`UPDATE urls SET short=? WHERE id=?`).run(short, id);
    return short;
  } else {
    // we already have this url, so let's just return the shortened version
    const row = db.prepare(`SELECT id, short FROM urls WHERE url=?`).get(url);
    return row.short;
  }
}

export function getUrl(short: string): { url: string, clicks: number } | null {
  const row = db.prepare(`SELECT url, clicks FROM urls WHERE short=?`).get(short);
  if (row == undefined) {
    return null;
  } else {
    return row;
  }
}

export function click(short: string) {
  db.prepare(`UPDATE urls SET clicks=clicks+1 WHERE short=?`).run(short);
}
