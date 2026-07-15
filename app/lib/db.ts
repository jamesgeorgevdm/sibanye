// Single shared Neon database client — import `sql` from here in any API route
// that needs to query the database. The neon() driver uses HTTP under the hood,
// which works in serverless/edge environments where a persistent TCP connection isn't available.

import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

const sql = neon(process.env.DATABASE_URL);

export default sql;
