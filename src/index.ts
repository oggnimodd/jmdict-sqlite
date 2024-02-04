import type { JMdict } from "@scriptin/jmdict-simplified-types";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
await migrate(db, { migrationsFolder: "./drizzle" });

const jmdict = require("../dictionaries/jmdict.json") as JMdict;

// Timer start
const start = Date.now();

// Loop through words
jmdict.words.forEach((word) => {
  // DEBUG
  // console.log(word.id);

  const wordId = Number(word.id);

  db.insert(schema.words)
    .values({
      id: wordId,
      data: JSON.stringify(word),
      hasNoKanji: word.kanji.length === 0 ? 1 : 0,
    })
    .run();

  // If there is kanji

  if (word.kanji.length !== 0) {
    word.kanji.forEach((kanji) => {
      db.insert(schema.kanji)
        .values({
          text: kanji.text,
          wordId,
        })
        .run();
    });
  } else if (word.kana.length !== 0) {
    word.kana.forEach((kana) => {
      db.insert(schema.kanji)
        .values({
          text: kana.text,
          wordId,
        })
        .run();
    });
  }
});

// Timer end in mm:ss
const end = Date.now();
console.log(`Took ${((end - start) / 1000).toFixed(2)} seconds`);
