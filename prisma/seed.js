const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
neonConfig.webSocketConstructor = ws;

// Manual parsing to ensure compatibility
const connectionString = process.env.DATABASE_URL;
const url = new URL(connectionString);

const poolConfig = {
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.substring(1),
  port: parseInt(url.port || '5432'),
  ssl: true
};

console.log('--- Connecting to:', poolConfig.host, '---');

const pool = new Pool(poolConfig); 

async function main() {
  console.log('--- Seeding Database (Raw SQL) ---');
  
  const pass = await bcrypt.hash('12345678', 10);
  
  try {
    // 1. Create Firm
    const firmRes = await pool.query(
      'INSERT INTO "Firm" (name, "scansLimit") VALUES ($1, $2) RETURNING id',
      ['Test Firm', 10]
    );
    const firmId = firmRes.rows[0].id;
    console.log('✅ Firm created:', firmId);

    // 2. Create Admin User
    await pool.query(
      'INSERT INTO "User" (email, name, "passwordHash", role, "firmId") VALUES ($1, $2, $3, $4, $5)',
      ['test@example.com', 'Test Admin', pass, 'ADMIN', firmId]
    );
    console.log('✅ User created: test@example.com / 12345678');

  } catch (e) {
    console.error('❌ Error during seeding:');
    console.error(e.message);
  } finally {
    await pool.end();
  }
}

main();
