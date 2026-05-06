const { Pool, neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const { setDefaultAutoSelectFamilyAttemptTimeout } = require('node:net');
require('dotenv').config();

// Fix for Node.js connection on Windows
setDefaultAutoSelectFamilyAttemptTimeout(1000);

// Use HTTP fetch instead of WebSockets to bypass network restrictions
neonConfig.webSocketConstructor = ws;
neonConfig.useFetchConnection = true;

const connectionString = process.env.DATABASE_URL;

console.log("Connection String:", connectionString ? "Defined (length: " + connectionString.length + ")" : "Undefined");

if (connectionString) {
    console.log("Host:", new URL(connectionString).host);
    console.log("🛠️  Attempting connection via HTTP Fetch fallback...");
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
