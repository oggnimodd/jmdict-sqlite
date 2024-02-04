import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const words = sqliteTable("words", {
  id: integer("id").primaryKey(),
  data: text("data").notNull(),

  // Optional
  hasNoKanji: integer("hasNoKanji"),
});

export const wordsRelation = relations(words, ({ many }) => ({
  kanji: many(kanji),
}));

export const kanji = sqliteTable("kanji", {
  id: integer("id").primaryKey(),
  text: text("text"),
  wordId: integer("wordId").references(() => words.id),
});

export const kanjiRelation = relations(kanji, ({ one }) => ({
  word: one(words, {
    fields: [kanji.id],
    references: [words.id],
  }),
}));
