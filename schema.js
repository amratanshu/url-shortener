import { pgTable, serial, text, index } from "drizzle-orm/pg-core";


export const urlTable = pgTable('url_table', {
    id: serial('id').primaryKey(),
    longUrl: text('long_url').notNull().unique(),
}, (table) => {
    return {
      longUrlIndex: index("long_url_index").on(table.longUrl),
    };
  });;