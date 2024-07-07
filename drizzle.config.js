import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './schema.js',
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: "localhost",
    user: "apple",
    password: "apple",
    database: "url_shortener_db",
  },
});
