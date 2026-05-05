const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
require('dotenv').config();

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

console.log("Connection String:", connectionString ? "Defined (length: " + connectionString.length + ")" : "Undefined");

if (connectionString) {
    console.log("Host:", new URL(connectionString).host);
}

const pool = new Pool({ connectionString });

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error("❌ Connection failed:");
    console.error(err);
  } else {
    console.log("✅ Connection successful! Server time:", res.rows[0].now);
  }
  pool.end();
});
