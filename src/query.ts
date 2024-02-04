import type { JMdict } from "@scriptin/jmdict-simplified-types";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { eq, like, sql } from "drizzle-orm";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite, {
  schema,
});

// Look for a word that has a certain kanji
// For a example what find word that has "の度に" as one of its kanji
const find = async (text: string) => {
  return db
    .select()
    .from(schema.kanji)
    .leftJoin(schema.words, eq(schema.kanji.wordId, schema.words.id))
    .where(like(schema.kanji.text, `%${text}%`))
    .execute();
};

const test = await find("せびる");
console.log(test);
